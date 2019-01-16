import React, { Component } from 'react';
import { View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body
} from 'native-base';
import { Constants, Segment } from 'expo'; // eslint-disable-line
import * as actions from '../../actions';
import { connect } from 'react-redux';
import PageControl from 'react-native-page-control';

const SCREEN_WIDTH = Dimensions.get('window').width;

//<Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
const styles = {
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    backgroundColor: '#ffcc33',
    padding: 10
  },
  contentContainerStyle: {
    backgroundColor: '#ffcc33'
  },
  cardBody: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  activityBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcc33'
  },
  benefits: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 10
  },
  trialNote: {
    fontSize: 9,
    marginTop: 5
  }
};

class SubscriptionPicker extends Component {
  state = {
    loading: true,
    plans: []
  };

  componentDidMount() {
    this.props.fetchPlans().then(plans => {
      console.log('plans', plans);
      this.setState({ plans, loading: false });
      Segment.screen('subscriptions');
    });
  }

  render() {
    return this.state.loading ? (
      <View style={styles.activityBackground}>
        <ActivityIndicator />
      </View>
    ) : (
      <ScrollView
        horizontal
        style={styles.contentContainerStyle}
        contentContainerStyle={styles.contentContainerStyle}
        pagingEnabled
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }

  renderSlides() {
    let trialend = this.props.session.subscription.trial_end || 0;
    const daysUntilTrialExpire = Math.round(
      (parseInt(trialend) -
        Math.floor(new Date().getTime() / 1000)) /
        (24 * 3600)
    );
    const trialnote =
      daysUntilTrialExpire > 0 ? (
        <Text style={styles.trialNote}>
          * your {daysUntilTrialExpire} day(s) of trial, will be transferred
          automatically
        </Text>
      ) : null;

    return this.state.plans.map((plan, index) => {
      let thumbnail;
      switch (plan.id) {
        case 'payperuse':
          thumbnail = require('../../assets/images/subscriptions/payperuse.png');
          break;
        case 'plus-medlemskab-sp8ces':
          thumbnail = require('../../assets/images/subscriptions/plus-medlemskab-sp8ces.png');
          break;
        default:
          thumbnail = require('../../assets/images/subscriptions/premium-medlemskab-sp8ces.png');
          break;
      }
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.slide} key={index}>
            <Card
              style={{
                flex: 1,
                width: '100%',
                borderRadius: 10,
                overflow: 'hidden',
                marginTop: 20
              }}
            >
              <CardItem>
                <Left>
                  <Thumbnail source={thumbnail} />
                  <Body>
                    <Text>{plan.invoice_name}</Text>
                    <Text note>{plan.description}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody style={styles.cardBody}>
                <Text style={styles.benefits}>{plan.cf_benefits}</Text>
              </CardItem>
              <CardItem cardBody style={styles.cardBody}>
                <Text style={{ fontSize: 22 }}>
                  {String(plan.price).endsWith('00')
                    ? String(plan.price).slice(0, -2)
                    : plan.price}
                  ,- {plan.currency_code}/{plan.period_unit}
                </Text>
              </CardItem>
              <CardItem style={styles.cardBody}>
                <Body style={styles.cardBody}>
                  {this.props.common.loading ? (
                    <ActivityIndicator />
                  ) : this.props.session.subscription.plan_id == plan.id &&
                  this.props.session.subscription.status != 'cancelled' ? (
                    <Button full rounded disabled>
                      <Text>Already on this plan</Text>
                    </Button>
                  ) : (
                    <Button
                      full
                      rounded
                      onPress={() => this.props.changePlan(plan.id)}
                    >
                      <Text>Go {plan.invoice_name.split(' ')[0]}</Text>
                    </Button>
                  )}
                  {trialnote}
                </Body>
              </CardItem>
            </Card>
          </View>
          <PageControl
            style={{ position: 'absolute', left: 0, right: 0, top: 10 }}
            numberOfPages={this.state.plans.length}
            currentPage={index}
            hidesForSinglePage
            pageIndicatorTintColor="gray"
            currentPageIndicatorTintColor="black"
            indicatorStyle={{ borderRadius: 5 }}
            currentIndicatorStyle={{ borderRadius: 5 }}
            indicatorSize={{ width: 8, height: 8 }}
          />
        </View>
      );
    });
  }
}

function mapStateToProps({ error, session, common }) {
  return { error, session, common };
}

export default connect(
  mapStateToProps,
  actions
)(SubscriptionPicker);

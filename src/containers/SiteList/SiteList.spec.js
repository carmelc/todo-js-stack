import {expect} from 'chai';
import nock from 'nock';
import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import SiteList from './SiteList';
import configureStore from '../../store/configureStore';
const fetch = require('node-fetch');

class SiteListDriver {

  constructor() {
    global.fetch = url => fetch(`${this.baseUrl}${url}`);
  }

  baseUrl = `http://localhost:5554`;

  given = {
    siteListValidData: () => {
      this.sites = [
        {
          id: 1,
          siteName: 'my cool site'
        }, {
          id: 2,
          siteName: 'another cool site'
        }, {
          id: 3,
          siteName: 'a different cool site'
        }];

      nock(this.baseUrl).get('/sites').reply(200, this.sites);

      return this;
    }
  };
  when = {
    created: () => {
      const store = configureStore();
      this.component = mount(
        <Provider store={store}>
          <SiteList/>
        </Provider>
      );
      return this;
    }
  }

  get = {
    mockedSites: () => this.sites,
    sites: () => this.component.find('.site')
  }
}

describe('SiteList container component', () => {
  let driver;

  beforeEach(() => {
    driver = new SiteListDriver();
  });

  it('should display sites', done => {
    driver.given.siteListValidData()
      .when.created();
    setTimeout(() => {
      expect(driver.get.sites().length).to.equal(3);
      expect(driver.get.sites().first().text()).to.equal(driver.get.mockedSites()[0].siteName);
      done();
    }, 1000);
  });
});



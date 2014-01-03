'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Shopping lists', function() {
  beforeEach(function() {
    browser().navigateTo('/');
    sleep(.5);
  });

  it("should list the available shopping lists and their categories", function() {
    expect(repeater('.shopping-list').count()).toBe(2);
    // expect(repeater('.done').count()).toBe(1);

    // element('.not-done:nth-child(1) input').click();
    // sleep(0.1);
    // expect(repeater('.not-done').count()).toBe(1);
    // expect(repeater('.done').count()).toBe(2);

    // element('.done:nth-child(1) input').click();
    // sleep(0.1);
    // expect(repeater('.not-done').count()).toBe(2);
    // expect(repeater('.done').count()).toBe(1);
  });
});
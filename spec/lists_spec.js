describe('lists view', function() {
  it('should allow the user to create a new list', function() {
    browser.get('/');

    element(by.model('yourName')).sendKeys('Julie');

    var greeting = element(by.binding('yourName'));

    expect(greeting.getText()).toEqual('Hello Julie!');
  });

  describe('shopping lists', function() {
    var shoppingLists;

    beforeEach(function() {
      browser.get('/');

      shoppingLists = element.all(by.repeater('list in shoppingLists'));
    });

    it('should list them', function() {
      expect(shoppingList.count()).toEqual(2);
      expect(todoList.get(1).getText()).toEqual('build an angular app');
    });

    it('should add a todo', function() {
      var addTodo = element(by.model('todoText'));
      var addButton = element(by.css('[value="add"]'));

      addTodo.sendKeys('write a protractor test');
      addButton.click();

      expect(todoList.count()).toEqual(3);
      expect(todoList.get(2).getText()).toEqual('write a protractor test');
    });
  });
});
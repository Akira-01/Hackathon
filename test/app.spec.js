const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');
const Actions = require('nightmare-react-utils').Actions;

Nightmare.action(...Actions);

let nightmare;

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

app.listen(8080);

const url = 'http://localhost:8080';

describe('Very Simple To Do App', function main() {
  this.timeout(20000);
  this.slow(4000);

  beforeEach(() => {
    nightmare = new Nightmare({show: true});
    // nightmare = new Nightmare({
    //   openDevTools: {
    //     mode: 'detach'
    //   },
    //   show: true
    // });
  });

  it('should load successfully', () => axios.get(url).then(r => expect(r.status === 200)));

  it('should include textarea element with class create-todo-text for the user to enter todo text', () =>
    nightmare
      .goto(url)
      .react.findAll('textarea.create-todo-text')
      .then((element) => {
        expect(element.length).to.not.equal(0);
        expect(element[0]).to.not.be.null;
        expect(typeof element).to.equal('object');
      })
  );

  it('should add todo item with priority', () =>
    nightmare
      .goto(url)
      .select('select.create-todo-priority', '1')
      .type('textarea.create-todo-text', 'ITEM')
      .click('button.create-todo')
      .wait(500)
      .evaluate(() => {
        const { innerText, className } = document.querySelectorAll('.todo')[0];
        return { innerText, className };
      })
      .then(({ innerText, className }) => {
        expect(innerText).to.contain('ITEM');
        expect(className).to.contain('success');
      })
  );

  it('should show todo item with edit and delete', () =>
    nightmare
      .goto(url)
      .select('select.create-todo-priority', '1')
      .type('textarea.create-todo-text', 'ITEM')
      .click('button.create-todo')
      .wait(500)
      .evaluate(() => [
        document.querySelectorAll('.edit-todo').length,
        document.querySelectorAll('.delete-todo').length
      ])
      .end()
      .then(([editButtons, deleteButtons]) => {
        expect(editButtons).to.equal(1);
        expect(deleteButtons).to.equal(1);
      })
  );

  it('should allow to edit a todo item by clicking .edit-todo of a todo element', () =>
    nightmare
      .goto(url)
      .select('select.create-todo-priority', '1')
      .type('textarea.create-todo-text', 'ITEM')
      .click('button.create-todo')
      .wait('.edit-todo')
      .click('.edit-todo')
      .wait('.update-todo-text')
      .type('.update-todo-text', ' UPDATED')
      .click('.update-todo')
      .evaluate(() => document.querySelectorAll('.todo')[0].innerText)
      .end()
      .then(finalValue => expect(finalValue).to.contain('UPDATED'))
  );

  it('should allow to delete a todo item by clicking .delete-todo of a todo element', () =>
    nightmare
      .goto(url)
      .select('select.create-todo-priority', '1')
      .type('textarea.create-todo-text', 'ITEM')
      .click('button.create-todo')

      .select('select.create-todo-priority', '1')
      .type('textarea.create-todo-text', 'ITEM2')
      .click('button.create-todo')
      .wait('.delete-todo')
      .click('.delete-todo')
      .wait(250)
      .evaluate(() => document.querySelectorAll('.todo').length)
      .end()
      .then(length => expect(length).to.equal(1))
  );
});

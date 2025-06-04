const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('addRecommendation', () => {
  let dom;
  let window;

  beforeEach(() => {
    const html = `<!DOCTYPE html><textarea id="new_recommendation"></textarea><div id="all_recommendations"></div><div id="popup" style="visibility:hidden"></div>`;
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    window = dom.window;

    // load script.js in the DOM context
    const scriptContent = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf-8');
    const scriptEl = window.document.createElement('script');
    scriptEl.textContent = scriptContent;
    window.document.body.appendChild(scriptEl);
  });

  test('adds recommendation and clears textarea', () => {
    const textarea = window.document.getElementById('new_recommendation');
    textarea.value = 'Great work!';

    // spy on showPopup
    const showPopup = jest.spyOn(window, 'showPopup');

    window.addRecommendation();

    const recommendations = window.document.getElementById('all_recommendations').querySelectorAll('.recommendation');
    expect(recommendations.length).toBe(1);
    expect(textarea.value).toBe('');
    expect(showPopup).toHaveBeenCalledWith(true);
  });
});

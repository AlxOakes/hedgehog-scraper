const express = require('express');
const app = express();
const cors = require('cors');
const Nightmare = require('nightmare');

const port = 3000;

app.use(cors());

// first endpoint - already built
// this says that when the app is at "/" - so "home", it will send a response of "Hedgehog Time". That is why we see those words on the screen when we go to localhost:3000/.
app.get('/', (req, res) => {
  res.send("KPOP Time");
});


app.get('/HyunA', (req, res) => {
  res.send("KPOP TIME");
});
// your endpoint
app.get('/HyunA/:keyword', (req, res) => {
  var keyword = req.params.keyword;
//takes keyword and searches it with the search bar
  function findHyunAImage(keyword) {
    var nightmare = Nightmare({ show: true });
    //below it is making sure the searching is spaced and waiting
    return nightmare
    .goto('https://www.google.com')//bot visits google.com
    .insert('input[title="Search"]', `HyunA ${keyword}`)//bot searches for hedgehog + whatever the keyword is
    .click('input[value="Google Search"]')//bot clicks Google search button
    .wait('a.q.qs')//tells bot to wait for the link to show up
    .click('a.q.qs')//tells bot to click the link button(after it shows up)
    .wait('div#res.med')//tells bot to wait for div to appear (cnontainer for images)
    .evaluate(function() { //next sequence take the certain photos and slices them from google to the websites
        var photoDivs = document.querySelectorAll('img.rg_ic');
        var list = [].slice.call(photoDivs);//collects all photo containers into one collection

        return list.map(function(div) {
          return div.src;//bot give us collections of image links
        });
      })
      .end() //here it's ending everything so that we can then slice and make sure it reports any errors
      .then(function(result) {
        return result.slice(1,5); //bot onlt takes four photos
      })
      .then(function (images) {
        res.json(images);//bot gives back images to the user
      })
      .catch(function (error) {
        console.error('Search Failed', error);
      })
  }
  findHyunAImage(keyword); //uses keyword to find certain searched aspects about hedgie
});

// scraper endpoint

app.listen(port, () => {
  console.log(`app running on ${port}`);
});

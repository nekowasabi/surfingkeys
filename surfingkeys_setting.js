// globala
settings.prevLinkRegex = /((<<|prev(ious)?)|<|‹|«|←|前へ|前のページ+)/i;
settings.nextLinkRegex = /((>>|next)|>|›|»|→|次へ|次のページ+)/i;
iunmap(":");


/**
   scrollByの動作がFirefox 65で予測不可能になったのでscrollToで再実装する
   スムーズスクロールする
   @param {number} size - スクロールするサイズ
   @param {number} ward - 1か-1でスクロールする方向を制御
 */
function scrollBySmooth(size, ward) {
  window.scrollTo({
    top: window.scrollY + ward * size,
    left: 0,
    behavior: "instant",
  });
}

// an example to replace `T` with `gt`, click `Default mappings` to see how `T` works.
map('gt', 'T');

map('d', 'x');

map("u", "X"); // undo closed tab

map('t', 'gf');

// pageup
map('l', 'e');

// Tabs
map("H", "E");
map("L", "R");

// History
map("B", "S");
unmap("S");
map("F", "D");
unmap("D");

// Reload
map("R", "r");
unmap("r");


mapkey("k", "Scroll up of line", () => {
  scrollBySmooth(window.innerHeight / 10, -3);
});
mapkey("j", "Scroll down of line", () => {
  scrollBySmooth(window.innerHeight / 10, 3);
});

// blacklist
settings.blacklistPattern = /mail.google.com|tweetdeck.twitter.com|jp.inoreader.com|calendar.google.com|rememberthemilk.co/;

// bookmarklet
mapkey(",h", "Scroll down of line", () => {
  var d=(new Date);
  var s=document.createElement('script');
  s.charset='UTF-8';
  s.src='https://b.hatena.ne.jp/js/Hatena/Bookmark/let.js?'+d.getFullYear()+d.getMonth()+d.getDate();(document.getElementsByTagName('head')[0]||document.body).appendChild(s);
});

// vim-like marks gn無効にした後に
// qmarks URL設定
var overlayedGlobalMarks = {
  'G': 'https://github.com/login',
  'i': 'https://jp.inoreader.com/login',
  'j': 'https://translate.google.com/',
  't': 'https://tomatoa1129.hostdon.ne.jp/',
};

// qmarksで設定したURLを新しいタブで開く
mapkey('gn', '#10Jump to vim-like mark in new tab', function(mark) {
  var priorityURLs = overlayedGlobalMarks[mark];
  if (priorityURLs === undefined) {
    // fallback to Surfingkeys default jump
    Normal.jumpVIMark(mark, true);
    return;
  }
  if (typeof priorityURLs == typeof "") {
    priorityURLs = [priorityURLs]
  }
  for (var url of priorityURLs) {
    var markInfo = {
      url: url,
      scrollLeft: 0,
      scrollTop: 0
    };
    markInfo.tab = {
      tabbed: true,
      active: true
    };
    RUNTIME("openLink", markInfo);
  }
});

// qmarksで設定したURLを現在のタブで開く
mapkey('go', '#10Jump to vim-like mark in current tab', function(mark) {
  var priorityURLs = overlayedGlobalMarks[mark];
  if (priorityURLs === undefined) {
    // fallback to Surfingkeys default jump
    Normal.jumpVIMark(mark, true);
    return;
  }
  if (typeof priorityURLs == typeof "") {
    priorityURLs = [priorityURLs]
  }
  for (var url of priorityURLs) {
    var markInfo = {
      url: url,
      scrollLeft: 0,
      scrollTop: 0
    };
    markInfo.tab = {
      tabbed: false,
      active: false
    };
    RUNTIME("openLink", markInfo);
  }
});

// rootにジャンプ
mapkey('gU', '#4Go to root of current URL hierarchy', function() {
    window.location.href = window.location.origin;
});

// open inspector
mapkey('si', '#12Open Chrome Inspect', function() {
tabOpenLink("chrome://inspect/#devices");
});

// ------------------------------------------------------------
// 検索エンジン
// Google jp 1年以内
addSearchAliasX('1', 'Google 1年以内', 'https://www.google.co.jp/search?q={0}&tbs=qdr:y,lr:lang_1ja&lr=lang_ja');
mapkey('o1', '#8Open Search with alias 1', function() {
  Front.openOmnibar({ type: "SearchEngine", extra: "1" });
});
// Google jp 3ヶ月以内
addSearchAliasX('3', 'Google 3ヶ月以内', 'https://www.google.co.jp/search?q={0}&tbs=qdr:m3,lr:lang_1ja&lr=lang_ja');
mapkey('o3', '#8Open Search with alias 3', function() {
  Front.openOmnibar({ type: "SearchEngine", extra: "3" });
});
// Google jp 6ヶ月以内
addSearchAliasX('6', 'Google 6ヶ月以内', 'https://www.google.co.jp/search?q={0}&tbs=qdr:m6,lr:lang_1ja&lr=lang_ja');
mapkey('o6', '#8Open Search with alias 6', function() {
  Front.openOmnibar({ type: "SearchEngine", extra: "6" });
});
// Amazon jp
addSearchAliasX(
  'a',
  'Amazon',
  'https://www.amazon.co.jp/s?k=',
  's',
  'https://completion.amazon.co.jp/search/complete?method=completion&search-alias=aps&mkt=6&q=',
  response => JSON.parse(response.text)[1]
)
mapkey('oa', '#8Open Search with alias a', function() {
  Front.openOmnibar({ type: 'SearchEngine', extra: 'a' })
})
// Amazon jp Kindle
addSearchAliasX(
  'k',
  'Amazon Kindle',
  'https://www.amazon.co.jp/s?i=digital-text&k=',
  's',
  'https://completion.amazon.co.jp/search/complete?method=completion&search-alias=aps&mkt=6&q=',
  response => JSON.parse(response.text)[1]
)
mapkey('ok', '#8Open Search with alias k', function() {
  Front.openOmnibar({ type: 'SearchEngine', extra: 'k' })
})
// Twitter tweets
addSearchAliasX('tt', 'twitter', 'https://twitter.com/search?q=');
mapkey('oT', '#8Open Search with alias tt', function() {
  Front.openOmnibar({ type: "SearchEngine", extra: "tt" });
});
// mercari
addSearchAliasX('m', 'mercari', 'https://www.mercari.com/jp/search/?status_on_sale=1&keyword=')
mapkey('om', '#8Open Search with alias m', function() {
  Front.openOmnibar({ type: "SearchEngine", extra: "m" });
});
// Tabs
mapkey('ot', 'Choose a tab with omnibar', function() {
    Front.openOmnibar({type: "Tabs"});
});
// stack ovewrflow
addSearchAliasX('s', 'stackoverflow', 'http://stackoverflow.com/search?q=');
mapkey('os', '#8Open Search with alias s', function() {
  Front.openOmnibar({ type: "SearchEngine", extra: "s" });
});

// open URL from clipboard
mapkey('p', '#3Open URL from clipboard', () => {
    Clipboard.read(response => {
        window.location.href = response.data;
    });
});
mapkey('P', '#1Open URL from clipboard in a new tab', () => {
    Clipboard.read(response => {
        window.open(response.data);
    });
})



// set theme
settings.theme = `
.sk_theme {
    font-family: Input Sans Condensed, Charcoal, sans-serif;
    font-size: 12pt;
    background: #24272e;
    color: #abb2bf;
}
.sk_theme tbody {
    color: #fff;
}
.sk_theme input {
    color: #d0d0d0;
}
.sk_theme .url {
    color: #61afef;
}
.sk_theme .annotation {
    color: #56b6c2;
}
.sk_theme .omnibar_highlight {
    color: #528bff;
}
.sk_theme .omnibar_timestamp {
    color: #e5c07b;
}
.sk_theme .omnibar_visitcount {
    color: #98c379;
}
.sk_theme #sk_omnibarSearchResult>ul>li:nth-child(odd) {
    background: #303030;
}
.sk_theme #sk_omnibarSearchResult>ul>li.focused {
    background: #3e4452;
}
#sk_status, #sk_find {
    font-size: 32pt;
}`;


// Copy
const copyTitleAndUrl = (format) => {
  const text = format
    .replace('%URL%', location.href)
    .replace('%TITLE%', document.title)
  Clipboard.write(text)
}
const copyHtmlLink = () => {
  const clipNode = document.createElement('a')
  const range = document.createRange()
  const sel = window.getSelection()
  clipNode.setAttribute('href', location.href)
  clipNode.innerText = document.title
  document.body.appendChild(clipNode)
  range.selectNode(clipNode)
  sel.removeAllRanges()
  sel.addRange(range)
  document.execCommand('copy', false, null)
  document.body.removeChild(clipNode)
  Front.showBanner('Ritch Copied: ' + document.title)
}

mapkey('ch', '#7Copy title and link to human readable', () => {
  copyTitleAndUrl('%TITLE% / %URL%')
})

// Hints style
// Link Hints
Hints.style (`
  font-family: monospace;
  font-size: 13pt;
  font-weight: normal;
  text-transform: lowercase;
`);

// Text Hints
Hints.style (`
  font-family: monospace;
  font-size: 13pt;
  text-transform: lowercase;
  `,
  "text"
);
settings.hintAlign = "left";
Hints.characters = 'asdfghjklwertxcvnm';



// click `Save` button to make above settings to take effect.

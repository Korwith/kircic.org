const page_button = document.querySelectorAll('.page_button');
const home_page = document.querySelector('.page.home');
const tracker_page = document.querySelector('.page.tracker');
const logo_button = document.querySelector('.icon.logo');

const horizontal = document.querySelector('.horizontal');
const sidebar = document.querySelector('nav.sidebar');
const content = document.querySelector('.content');
const tab_select = document.querySelector('.tab_select');

const search = sidebar.querySelector('.search');
const sidebar_list = sidebar.querySelector('.stock_holder');
const search_pane = sidebar.querySelector('.search_pane');
const stock_placeholder = document.querySelector('.placeholder');
const info_holder = document.querySelector('.info_holder');
const info_iframe = info_holder.querySelector('iframe');

let search_data;

const iframe_link = {
    'home': {
        'banner': 'https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22title%22%3A%22S%26P%20500%20Index%22%7D%2C%7B%22proName%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22title%22%3A%22US%20100%20Cash%20CFD%22%7D%2C%7B%22proName%22%3A%22FX_IDC%3AEURUSD%22%2C%22title%22%3A%22EUR%20to%20USD%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3ABTCUSD%22%2C%22title%22%3A%22Bitcoin%22%7D%2C%7B%22proName%22%3A%22BITSTAMP%3AETHUSD%22%2C%22title%22%3A%22Ethereum%22%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22compact%22%2C%22colorTheme%22%3A%22dark%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A104%2C%22utm_source%22%3A%22www.tradingview.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22ticker-tape%22%2C%22page-uri%22%3A%22www.tradingview.com%2Fwidget-wizard%2Fen%2Flight%2Fticker-tape%2F%22%7D',
        'overview': 'https://www.tradingview-widget.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%2212M%22%2C%22showChart%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22largeChartUrl%22%3A%22%22%2C%22isTransparent%22%3Atrue%2C%22showSymbolLogo%22%3Atrue%2C%22showFloatingTooltip%22%3Afalse%2C%22plotLineColorGrowing%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22plotLineColorFalling%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22gridLineColor%22%3A%22rgba(240%2C%20243%2C%20250%2C%200)%22%2C%22scaleFontColor%22%3A%22rgba(209%2C%20212%2C%20220%2C%201)%22%2C%22belowLineFillColorGrowing%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22belowLineFillColorFalling%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22belowLineFillColorGrowingBottom%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22belowLineFillColorFallingBottom%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22symbolActiveColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Indices%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22d%22%3A%22S%26P%20500%20Index%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22d%22%3A%22US%20100%20Cash%20CFD%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3ADJI%22%2C%22d%22%3A%22Dow%20Jones%20Industrial%20Average%20Index%22%7D%2C%7B%22s%22%3A%22INDEX%3ANKY%22%2C%22d%22%3A%22Nikkei%20225%22%7D%2C%7B%22s%22%3A%22INDEX%3ADEU40%22%2C%22d%22%3A%22DAX%20Index%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3AUKXGBP%22%2C%22d%22%3A%22FTSE%20100%20Index%22%7D%5D%2C%22originalTitle%22%3A%22Indices%22%7D%2C%7B%22title%22%3A%22Futures%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME_MINI%3AES1!%22%2C%22d%22%3A%22S%26P%20500%22%7D%2C%7B%22s%22%3A%22CME%3A6E1!%22%2C%22d%22%3A%22Euro%22%7D%2C%7B%22s%22%3A%22COMEX%3AGC1!%22%2C%22d%22%3A%22Gold%22%7D%2C%7B%22s%22%3A%22NYMEX%3ACL1!%22%2C%22d%22%3A%22WTI%20Crude%20Oil%22%7D%2C%7B%22s%22%3A%22NYMEX%3ANG1!%22%2C%22d%22%3A%22Gas%22%7D%2C%7B%22s%22%3A%22CBOT%3AZC1!%22%2C%22d%22%3A%22Corn%22%7D%5D%2C%22originalTitle%22%3A%22Futures%22%7D%2C%7B%22title%22%3A%22Bonds%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CBOT%3AZB1!%22%2C%22d%22%3A%22T-Bond%22%7D%2C%7B%22s%22%3A%22CBOT%3AUB1!%22%2C%22d%22%3A%22Ultra%20T-Bond%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBL1!%22%2C%22d%22%3A%22Euro%20Bund%22%7D%2C%7B%22s%22%3A%22EUREX%3AFBTP1!%22%2C%22d%22%3A%22Euro%20BTP%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBM1!%22%2C%22d%22%3A%22Euro%20BOBL%22%7D%5D%2C%22originalTitle%22%3A%22Bonds%22%7D%2C%7B%22title%22%3A%22Forex%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FX%3AEURUSD%22%2C%22d%22%3A%22EUR%20to%20USD%22%7D%2C%7B%22s%22%3A%22FX%3AGBPUSD%22%2C%22d%22%3A%22GBP%20to%20USD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDJPY%22%2C%22d%22%3A%22USD%20to%20JPY%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCHF%22%2C%22d%22%3A%22USD%20to%20CHF%22%7D%2C%7B%22s%22%3A%22FX%3AAUDUSD%22%2C%22d%22%3A%22AUD%20to%20USD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCAD%22%2C%22d%22%3A%22USD%20to%20CAD%22%7D%5D%2C%22originalTitle%22%3A%22Forex%22%7D%5D%2C%22utm_source%22%3A%22www.tradingview.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22market-overview%22%2C%22page-uri%22%3A%22www.tradingview.com%2Fwidget-wizard%2Fen%2Flight%2Fmarket-overview%2F%22%7D',
        'most_active': 'https://www.tradingview-widget.com/embed-widget/hotlists/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%2212M%22%2C%22exchange%22%3A%22US%22%2C%22showChart%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22largeChartUrl%22%3A%22%22%2C%22isTransparent%22%3Atrue%2C%22showSymbolLogo%22%3Atrue%2C%22showFloatingTooltip%22%3Afalse%2C%22plotLineColorGrowing%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22plotLineColorFalling%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22gridLineColor%22%3A%22rgba(240%2C%20243%2C%20250%2C%200)%22%2C%22scaleFontColor%22%3A%22rgba(209%2C%20212%2C%20220%2C%201)%22%2C%22belowLineFillColorGrowing%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22belowLineFillColorFalling%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22belowLineFillColorGrowingBottom%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22belowLineFillColorFallingBottom%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22symbolActiveColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.12)%22%2C%22utm_source%22%3A%22www.tradingview.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22hotlists%22%2C%22page-uri%22%3A%22www.tradingview.com%2Fwidget-wizard%2Fen%2Flight%2Fmarket-movers%2F%22%7D',    
    },
    'news': {
        'full': 'https://www.tradingview-widget.com/embed-widget/timeline/#%7B%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22regular%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22colorTheme%22%3A%22dark%22%2C%22utm_source%22%3A%22www.tradingview.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22timeline%22%2C%22page-uri%22%3A%22www.tradingview.com%2Fwidget-wizard%2Fen%2Flight%2Ftimeline%2F%22%7D',
    },
    'crypto': {
        'full': 'https://www.tradingview-widget.com/embed-widget/crypto-mkt-screener/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22defaultColumn%22%3A%22overview%22%2C%22screener_type%22%3A%22crypto_mkt%22%2C%22displayCurrency%22%3A%22USD%22%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Atrue%2C%22market%22%3A%22crypto%22%2C%22enableScrolling%22%3Atrue%2C%22utm_source%22%3A%22www.tradingview.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22cryptomktscreener%22%2C%22page-uri%22%3A%22www.tradingview.com%2Fwidget-wizard%2Fen%2Flight%2Fcrypto-mkt-screener%2F%22%7D',
    }
}

const preset_image = {
    'BTCUSD': 'icon/bitcoin_color.svg',
    'ETHUSD': 'icon/etherium_color.svg',
    'XRPUSD': 'icon/xrp_color.svg',
    'SOLUSD': 'icon/solana_color.png',
    'ADAUSD': 'icon/cardano_color.svg',
    'TRXUSD': 'icon/tron_color.svg',
    'LTCUSD': 'icon/litecoin_color.svg',
    'POLUSD': 'icon/polygon_color.svg',
    'XMRUSD': 'icon/monero_color.svg',
    'ATOMUSD': 'icon/cosmos_color.svg',
    'DOGEUSD': 'icon/doge_color.svg',
}

// Handle pages
function showPage(page_class, first) {
    let active_page = document.querySelector('.page.show');
    if (active_page) {
        active_page.classList.remove('show')
    }

    let found_page = document.querySelector('.page.' + page_class);
    found_page.classList.add('show');

    let found_iframe = found_page.querySelector('iframe');
    if (!found_iframe) {
        loadPageContent(page_class);
    }

    if (!first && window.innerWidth < 767) {
        sidebarButton();
    }
}

function handleHistoryState(page, exchange, ticker) {
    if (window.location.href.includes('#')) {
        window.history.pushState(null, null, window.location.href.split('#')[0]);
    }
    window.history.pushState(null, null, window.location.href + '#' + page);
    if (exchange && ticker) {
        window.history.pushState(null, null, window.location.href + '$' + exchange + ':' + ticker);
    }
}

function readHistoryState() {
    let read_href = window.location.href
    if (read_href.includes('$')) {
        let split = window.location.href.split('$')[1];
        let vars = split.split(':');
        showPage('tracker', true);
        loadTrackerWidget(vars[0], vars[1]);
        return;
    } else {
        loadTrackerWidget('NASDAQ', 'AAPL');
    }

    if (read_href.includes('#')) {
        let to_open = read_href.split('#')[1];
        let valid = document.querySelector('.page.' + to_open);
        if (!valid) { 
            window.history.pushState(null, null, read_href.split('#')[0]);
            return;
        }
        showPage(to_open, true);
    }
}

function pageButtonClick(event) {
    let last_class = Array.from(event.target.classList).pop();
    showPage(last_class);
    handleHistoryState(last_class);
}

function handlePageButton() {
    for (var i = 0; i < page_button.length; i++) {
        let this_button = page_button[i];
        this_button.onclick = pageButtonClick;
    }
}

// handle sidebar open
function sidebarButton() {
    if (sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        content.classList.remove('hide');
    } else {
        sidebar.classList.add('show');
        content.classList.add('hide');
    }
}

async function fetchSearchData() {
    let url = 'source/stock_info.csv';
    try {
        let response = await fetch(url)
        if (!response.ok) {
            throw new Error(response.status);
        }
        let text = await response.text();
        parseSearchData(text);
    } catch (error) {
        console.error(error);
    }
}

function parseSearchData(text) {
    let lines = text.split('\n');
    let formatted = [];
    for (var i = 1; i < lines.length; i++) {
        let this_row = lines[i];
        let split = this_row.split(',');
        let obj = {
            ticker: split[0],
            name: split[1],
            exchange: split[2]
        }
        formatted.push(obj);
    }
    search_data = formatted;
}

async function fetchSidebarData() {
    let url = ['source/etf.csv', 'source/featured.csv', 'source/crypto.csv'];
    for (var i = 0; i < url.length; i++) {
        let entry = url[i];
        try {
            let response = await fetch(entry)
            if (!response.ok) {
                throw new Error(response.status);
            }
            let text = await response.text();
            loadSidebarData(entry, text);
        } catch (error) {
            console.error(error);
        }
    }
}

function loadSidebarData(entry, text) {
    let found_parent = sidebar_list.querySelector(`.frame_list[source="${entry}"]`);
    let lines = text.split('\n');

    for (var i = 1; i < lines.length; i++) {
        let this_row = lines[i];
        let split = this_row.split(',');
        let clone = stock_placeholder.cloneNode(true);
        let clone_icon = clone.querySelector('.stock_icon');
        let clone_name = clone.querySelector('.stock_name');
        let clone_ticker = clone.querySelector('.stock_ticker');

        clone.setAttribute('tick', split[0]);
        clone.setAttribute('name', split[1]);
        clone.setAttribute('exchange', split[2]);
        clone_ticker.textContent = split[0];
        clone_name.textContent = split[1];
        clone.classList.remove('placeholder');
        clone.onclick = stockButtonClick;
        found_parent.appendChild(clone);

        let found_preset = preset_image[split[0]];
        if (found_preset) {
            clone_icon.src = found_preset;
            continue;
        }

        let test_icon = new Image();
        test_icon.onload = function() {
            clone_icon.src = `https://assets.parqet.com/logos/symbol/${split[0]}?format=png`;
            test_icon.remove();
        }
        test_icon.onerror = function() {
            clone_icon.classList.add('loadfail');
            clone_icon.src = 'icon/money.svg';
            test_icon.remove();
        }
        test_icon.src = `https://assets.parqet.com/logos/symbol/${split[0]}?format=png`;
    }
}

// handle sidebar search
function handleSearch() {
    if (search.value.length == 0) {
        sidebar_list.classList.remove('searching');
        return;
    } 
    if (search_data.length == 0) { return };

    sidebar_list.classList.add('searching');
    let match = [];
    for (var i = 0; i < search_data.length; i++) {
        let this_entry = search_data[i];
        let lowercase_tick = this_entry.ticker.toLowerCase();
        let lowercase_name = this_entry.name.toLowerCase();
        let lowercase_value = search.value.toLowerCase();

        if (this_entry.ticker.includes('.') || this_entry.ticker.includes('-')) { continue };
        if (lowercase_tick.includes(lowercase_value) || lowercase_name.includes(lowercase_value)) {
            match.push(this_entry);
        }
    }
    generateEntries(match);
}

function generateEntries(match) {
    clearEntries();
    for (var i = 0; i < 15; i++) {
        let this_entry = match[i];
        let this_clone = stock_placeholder.cloneNode(true);
        let this_logo = this_clone.querySelector('.stock_icon');
        let this_name = this_clone.querySelector('.stock_name');
        let this_ticker = this_clone.querySelector('.stock_ticker');

        this_logo.remove();
        this_name.textContent = this_entry.name;
        this_ticker.textContent = this_entry.ticker;
        this_clone.setAttribute('tick', this_entry.ticker);
        this_clone.setAttribute('name', this_entry.name);
        this_clone.setAttribute('exchange', this_entry.exchange)
        this_clone.classList.remove('placeholder');
        this_clone.onclick = stockButtonClick;
        search_pane.appendChild(this_clone);
    }
}

function clearEntries() {
    let all_entry = search_pane.querySelectorAll('.stock');
    for (var i = 0; i < all_entry.length; i++) {
        let this_entry = all_entry[i];
        this_entry.remove();
    }
}

// THIS IS DISABLED
let hovered
function sidebarHover(event) {
    if (!event.target.classList.contains('stock')) { 
        hideInfoHolder();
        return false 
    };
    let ticker = event.target.getAttribute('tick');
    if (!ticker) { return };
    if (ticker == hovered) { return };
    hovered = ticker;

    info_holder.classList.add('show');
    let target_rect = event.target.getBoundingClientRect();
    let center_y = target_rect.top + (target_rect.height/2);
    
    info_holder.style.left = target_rect.right + 15 + 'px';
    info_holder.style.top = center_y + 'px';
    info_iframe.removeAttribute('src');
    info_iframe.src = `https://www.tradingview-widget.com/embed-widget/single-quote/?locale=en#%7B%22symbol%22%3A%22FX%3A${ticker}%22%2C%22width%22%3A%22100%25%22%2C%22isTransparent%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%2C%22height%22%3A126%2C%22utm_source%22%3A%22www.tradingview.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22single-quote%22%2C%22page-uri%22%3A%22www.tradingview.com%2Fwidget-wizard%2Fen%2Flight%2Fsingle-ticker%2F%22%7D`
}

function hideInfoHolder() {
    hovered = null;
    info_holder.classList.remove('show');
}

// handle widget gen
function loadPageContent(page) {
    let page_widget = iframe_link[page];
    if (!page_widget) { return };
    let page_element = document.querySelector('.page.' + page);
    if (page_widget.full) {
        loadWidget(page_element, page_widget.full);
        return;
    }

    for (var i in page_widget) {
        let holder = page_element.querySelector('.' + i);
        let link = page_widget[i];
        loadWidget(holder, link)
    }
}

function loadWidget(holder, link) {
    let iframe = document.createElement('iframe');
    iframe.src = link;
    holder.appendChild(iframe);
}

function openTab(event) {
    if (!event.target) { return false };
    let to_open = event.target.getAttribute('open');
    if (!to_open) { return false };
    if (event.target.classList.contains('active')) { return false };
    
    let active_tab = tab_select.querySelector('.active');
    active_tab.classList.remove('active');
    event.target.classList.add('active');

    let active_page = horizontal.querySelector('.show');
    let to_open_dom = horizontal.querySelector('.' + to_open);
    to_open_dom.classList.add('show');
    active_page.classList.remove('show');
}

function handleTabSelect() {
    let tab_button = tab_select.querySelectorAll('button');
    for (var i = 0; i < tab_button.length; i++) {
        let this_button = tab_button[i];
        this_button.onclick = openTab;
    }
}

// Handle tacker page
function loadTrackerWidget(exchange, ticker) {
    let widget = new TradingView.widget({
        "autosize": true,
        "symbol": `${exchange}:${ticker}`,
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "3",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": true,
        "withdateranges": true,
        "range": "YTD",
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "details": true,
        "hotlist": true,
        "calendar": true,
        "show_popup_button": true,
        "popup_width": "1000",
        "popup_height": "650",
        "container_id": "tradingview_1dcca",
    });

    let widget_dom = document.querySelector('#' + widget.id);
    let widget_parent = widget_dom.parentElement;
    tracker_page.appendChild(widget_parent);
}

function stockButtonClick(event) {
    let ticker = event.target.getAttribute('tick');
    let exchange = event.target.getAttribute('exchange');
    if (!ticker || !exchange) { return };
    handleHistoryState('tracker', exchange, ticker);
    //loadTrackerWidget(exchange, ticker);

    if (window.innerWidth < 767) {
        sidebarButton();
    }
    window.location.reload();
}

loadPageContent('home');
handlePageButton();
handleTabSelect();
fetchSidebarData();
fetchSearchData();
readHistoryState();
logo_button.onclick = sidebarButton;
search.addEventListener('input', handleSearch);
// DISABLED THIS
// sidebar_list.addEventListener('mousemove', sidebarHover);
// sidebar_list.addEventListener('mouseleave', hideInfoHolder);

const interGray = [
]
const interNoGray = []

const normalUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'

const webGray = [{
  header: 'user-agent',
  operation: 'set',
}]
const webNoGray = [
  {
    header: 'user-agent',
    operation: 'set',
    value: normalUserAgent,
  }
]

const initialRules = [{
  id: 2,
  priority: 2,
  action: {
    type: "modifyHeaders", // 参考：https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-RuleActionType
    requestHeaders: [],
  },
  condition: {
    urlFilter: '*',
    resourceTypes: Object.values(chrome.declarativeNetRequest.ResourceType),
  },
}];

const addRules = (headers) => {
  initialRules[0].action.requestHeaders = headers;
  chrome.declarativeNetRequest.getDynamicRules(function (res) {
    let rules = res.map((e) => e.id);
    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: initialRules, //Rule[] optional
        removeRuleIds: rules, //number[] optional
      },
      function (callback) {}
    );
  });
}

// 监听传递过来的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('这是background脚本onMessage', message);
  if (message === '001') {
    // addRules([...sitB, ...webNoGray])
  } else if (message === '110') {
    addRules([...interGray, ...webGray])
  } else if (message === '000') {
    addRules([...interNoGray, ...webNoGray])
  } else if (message === '010') {
    addRules([...interNoGray, ...webGray])
  } else if (message === '100') {
    addRules([...interGray, ...webNoGray])
  } else {
    console.log('background脚本onMessage: else', message);
  }
  // chrome.tabs.reload()
  sendResponse('success');
});
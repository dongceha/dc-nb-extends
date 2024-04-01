const interfaceKey = 'dc-nb-inter'
const webpageKey = 'dc-nb-webpage'
const sitbKey = 'dc-nb-sitb'

$(() => {
  $('#inter').prop('checked', localStorage.getItem(interfaceKey) === '1')
  $('#webpage').prop('checked', localStorage.getItem(webpageKey) === '1')

  const combineGray = (sitb, interGray, webGray) => {
    if (sitb) {
      chrome.runtime.sendMessage("001");
      return
    }
    if (interGray && webGray) {
      chrome.runtime.sendMessage("110");
    } else if (!interGray && !webGray) {
      chrome.runtime.sendMessage("000");
    } else if (!interGray && webGray) {
      chrome.runtime.sendMessage("010");
    } else if (interGray && !webGray) {
      chrome.runtime.sendMessage("100");
    }
  }

  // combineGray($('#inter').prop('checked'), $('#webpage').prop('checked'))
  const doCombine = () => {
    combineGray($('#sitb').prop('checked') ,$('#inter').prop('checked'), $('#webpage').prop('checked'))
  }
  $('#inter').on('click', async (val) => {
    localStorage.setItem(interfaceKey, val.target.checked ? '1' : '2')
    doCombine()
  })
  $('#sitb').on('click', async (val) => {
    localStorage.setItem(sitbKey, val.target.checked ? '1' : '2')
    doCombine()
  })
  $('#webpage').on('click', async (val) => {
    localStorage.setItem(webpageKey, val.target.checked ? '1' : '2')
    doCombine()
  })
})


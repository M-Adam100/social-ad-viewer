document.querySelector('#comments').addEventListener('change',(e) => {
    chrome.storage.local.set({ number: e.target.value})
})

document.querySelector('#ads').addEventListener('change',(e) => {
    console.log(e.target.value)
    chrome.storage.local.set({ ads: e.target.value })
})

document.querySelector('#Save_Settings').addEventListener('click',(e) => {
  chrome.storage.local.set({
    number: document.querySelector('#comments').value,
    ads: document.querySelector('#ads').value
  })
})

const setUI = () => {
  chrome.storage.local.get(['number', 'ads'], CS => {
      console.log(CS);
    if (CS.number) document.querySelector('#comments').value = CS.number;
    if (CS.ads) document.querySelector('#ads').value = CS.ads;
  })
}

setUI();









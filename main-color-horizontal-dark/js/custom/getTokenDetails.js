$(document).ready( function() {
    getTotalSupply();
    getHolders();
    getTransactions();
    getTelegramFollowers();
    getTwitterFollowers();
    window.setInterval(function () {
        getTotalSupply();
        getHolders();
        getTransactions();
        getTelegramFollowers();
        getTwitterFollowers();
    }, 5000);
})

function getTotalSupply() {
    $.ajax({
        url: `http://151.236.220.142:2083/total_supply`}).done(function(data, status) {
        if(status == 'success') {
            let totalSupply = data.totalSupply.toString();
            // console.log(totalSupply)
            $('#total_supply').html(convertToComma(totalSupply));
        } else {
            console.log("Error: getting totalSupply error");
        }
    })
}

function getHolders() {
    $.ajax({
        url: `http://151.236.220.142:2083/holders`}).done(function(data, status) {
        if(status == 'success') {
            let holders = data.holders.toString();
            $('#current_holders').html(convertToComma(holders));
        } else {
            console.log("Error: getting holders error");
        }
    })
}

function getTransactions() {
    $.ajax({
        url: `http://151.236.220.142:2083/transactions_count`}).done(function(data, status) {
        if(status == 'success') {
            let transactions = data.transactions_count.toString();
            $('#transactions_count').html(convertToComma(transactions));
        } else {
            console.log("Error: getting transactions error");
        }
    })
}

function getTelegramFollowers() {
    $.ajax({
        url: `http://151.236.220.142:2083/telegram_followers`}).done(function(data, status) {
        if(status == 'success') {
            let telegram_followers = data.telegram_followers.toString();
            $('#telegram_followers').html(convertToComma(telegram_followers));
        } else {
            console.log("Error: getting telegram followers error");
        }
    })
}

function getTwitterFollowers() {
    $.ajax({
        url: `http://151.236.220.142:2083/twitter_followers`}).done(function(data, status) {
        if(status == 'success') {
            let twitter_followers = data.twitter_followers.toString();
            $('#twitter_followers').html(convertToComma(twitter_followers));
        } else {
            console.log("Error: getting twitter followers error");
        }
    })
}

function noExponents(input) { // string
  const data= input.split(/[eE]/);
  if(data.length === 1) return data[0]; 

  let  z= '';
  const sign= Number(input) < 0 ? '-' : '';
  const str= data[0].replace('.', '');
  let mag= Number(data[1])+ 1;

  if(mag < 0) {
      z= sign.concat('0.');
      while(mag++) z += '0';
      return z + str.replace(/^-/,'');
  }
  mag -= str.length;  
  while(mag--) z += '0';
  return str + z;
}

function convertToComma(_input) { // string
    let input = noExponents(_input);
    if(input.length > 13 && window.sessionStorage.getItem("stretchText") === "normal") {
      window.sessionStorage.setItem("stretchText", "stretch");
    }

    if(Number(input) < 1 && Number(input) > 0.000001 && input.length > 10) {
      input = input.substr(0, 10);
    }
    else if(Number(input) <= 0.000001) {
      let index = 2;
      while(input[index] === "0" && input.length > index) index++;
      input = input.substr(0, index + 3);
    }
    const inputArray = input.split(".");
    const formattedArray = [];
    while(true) {
      if(inputArray[0].length > 3) {
        const each = inputArray[0].slice(-3);
        inputArray[0] = inputArray[0].slice(0, -3);
        formattedArray.unshift(`, ${each}`);
      }
      else {
        if(inputArray[0].length) formattedArray.unshift(inputArray[0]);
        break;
      }
    }
    let formattedInteger = formattedArray.join("");
    if(inputArray.length > 1) formattedInteger = formattedInteger.concat(".", inputArray[1]);
    return formattedInteger;
  }
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
            let totalSupply = data.totalSupply;
            // console.log(totalSupply)
            $('#total_supply').html(totalSupply);
        } else {
            console.log("Error: getting totalSupply error");
        }
    })
}

function getHolders() {
    $.ajax({
        url: `http://151.236.220.142:2083/holders`}).done(function(data, status) {
        if(status == 'success') {
            let holders = data.holders;
            $('#current_holders').html(holders);
        } else {
            console.log("Error: getting holders error");
        }
    })
}

function getTransactions() {
    $.ajax({
        url: `http://151.236.220.142:2083/transactions_count`}).done(function(data, status) {
        if(status == 'success') {
            let transactions = data.transactions_count;
            $('#transactions_count').html(transactions);
        } else {
            console.log("Error: getting transactions error");
        }
    })
}

function getTelegramFollowers() {
    $.ajax({
        url: `http://151.236.220.142:2083/telegram_followers`}).done(function(data, status) {
        if(status == 'success') {
            let telegram_followers = data.telegram_followers;
            $('#telegram_followers').html(telegram_followers);
        } else {
            console.log("Error: getting telegram followers error");
        }
    })
}

function getTwitterFollowers() {
    $.ajax({
        url: `http://151.236.220.142:2083/twitter_followers`}).done(function(data, status) {
        if(status == 'success') {
            let twitter_followers = data.twitter_followers;
            $('#twitter_followers').html(twitter_followers);
        } else {
            console.log("Error: getting twitter followers error");
        }
    })
}
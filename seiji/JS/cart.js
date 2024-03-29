const client = ShopifyBuy.buildClient({
  domain: "seiji-oda.myshopify.com",
  storefrontAccessToken: "4cfc276b45d429f31dfa83df1cc1f826"
});

$(() => {
  var currCheckout;
  var checkoutId = localStorage.getItem("checkoutId");
  if (checkoutId == null) {
    client.checkout.create().then(checkout => {
      localStorage.setItem("checkoutId", checkout.id);
      checkoutId = checkout.id;
    });
  } else {
    client.checkout
      .fetch(checkoutId)
      .then(checkout => {
        currCheckout = checkout;
        var items = checkout.lineItems;
        if (items.length > 0) {
          for (var i = 0; i < items.length; i++) {
            addItem(items[i]);
          }
          $(".cart-wrap").append(`<button id="checkout">CHECK OUT</button>`);
        } else {
          $(".cart-wrap").append(`<h1>Cart is empty</h1>`);
        }
      })
      .catch(err => {
        client.checkout.create().then(checkout => {
          localStorage.setItem("checkoutId", checkout.id);
          checkoutId = checkout.id;
        });
      });
  }

  function addItem(item) {
    var price = parseFloat(item.variant.price) * item.quantity;
    var itemDiv = document.createElement("div");
    itemDiv.className = "cart-row";
    itemDiv.innerHTML = `
		<div class="delete-item" value="${item.id}">X</div>
    <div class="cart-img"><img src="${item.variant.image.src}"></div>
    <div class="cart-item-info">${item.title}</div>
    <div class="cart-item-size">${item.variant.selectedOptions[0].value}</div>
    <div class="cart-item-quantity">${item.quantity}</div>
    <div class="cart-item-price">$${price}</div>`;
    itemDiv.value = item;
    document.getElementsByClassName("cart-wrap")[0].appendChild(itemDiv);
  }

  $(document).on("click", "#checkout", function() {
    if (currCheckout.lineItems.length != 0) {
      window.open(currCheckout.webUrl);
    }
  });

  $(document).on("click", ".delete-item", function() {
    var elem = $(this).parent();
    elem.fadeOut(function() {
      elem.remove();
    });
    var itemId = $(this)[0].attributes.value.nodeValue;
    const lineItemIds = [itemId];
    client.checkout.removeLineItems(checkoutId, lineItemIds).then(checkout => {
      currCheckout = checkout;
    });
  });
});
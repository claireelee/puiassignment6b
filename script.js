
// global cart variables

let priceMap = new Map();
priceMap[1] = '$1.00'
priceMap[3] = '$3.00'
priceMap[6] = '$6.00'
priceMap[12] = '$12.00'

class cartItem {
  constructor(flavor, glaze, quantity, id) {
    this.flavor = flavor;
    this.glaze = glaze;
    this.quantity = quantity;
    this.id = id
  }

  //importing HTML into script file
  
  getHTML() {
    var html = '<div id="item" class="cartitems">' +
    '<div class="cartpicture">' +
    '<img src="images/selectionpic.png" alt="Product photo">' +
    '</div>' +
    '<div class="carttext">' +
    '    <div class="text">' +
    '        <b>' + this.flavor + '</b><br>' +
    '        Glaze: ' + this.glaze + '<br>' +
    '        Quantity: ' + this.quantity + ' pcs<br>' +
    '        <b>' + priceMap[this.quantity] + '</b><br>' +
    '    </div>' +
    '</div>' +
    '<div class="carticon">' +
    '    <div class="icon">' +
    '        <i class="fas fa-heart"></i>' +
    '    </div>' +
    '</div>' +
    '<div class="cartedit">' +
    '    <div class="smallbutton">' +
    '        <a href="orderpage.html">&nbsp; Edit &nbsp;</a>' +
    '    </div>' +
    '</div>' +
    '<div class="cartdelete">' +
    '    <div class="smallbutton" onclick="removeCartItem(' + this.id + ') ">' +
    '        Delete' +
    '    </div>' +
    '</div>' +
    '</div>';
    return html;
  }
}

// restore state
var numCartItems = 0;
if (window.localStorage.getItem("numCartItems") != null) {
    numCartItems = parseInt(window.localStorage.getItem("numCartItems"));
}
document.getElementById('clickcount').innerHTML = "Cart" + " " + "(" + (numCartItems) + ")";
var cartItems = new Map();
if (window.localStorage.getItem("cartItems") != null) {
    cartItems = JSON.parse(window.localStorage.getItem("cartItems"));
}
var uuid = 0;
if (window.localStorage.getItem("uuid") != null) {
    uuid = parseInt(window.localStorage.getItem("uuid"));
}
console.log(numCartItems);
console.log(cartItems);

var curFlavor = "";
var curGlaze = "";
var curQuantity = "";

//clicking "add to cart" increases the cart count by 1 and scrolls up to display nav bar
function addCartClick() {
  document.getElementById('clickcount').innerHTML = "Cart" + " " + "(" + (++numCartItems) + ")";

  var newItem = new cartItem(curFlavor, curGlaze, parseInt(curQuantity), uuid);
  cartItems[uuid] = newItem;
  ++uuid;
  window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  window.localStorage.setItem("numCartItems", numCartItems.toString());
  window.localStorage.setItem("uuid", uuid.toString());

  var nav = document.getElementById("nav");
  nav.scrollIntoView();
}

//remove item from cart, adjust cart subtotal
function removeCartItem(itemId) {
  var cartItem = document.getElementById("item");
  cartItem.remove();
  delete cartItems[itemId]
  var cartPrice = document.getElementById("cartprice");
  document.getElementById('clickcount').innerHTML = "Cart" + " " + "(" + (--numCartItems) + ")";
  var subtotal = 0;
  for (let item of Object.values(cartItems)) {
    subtotal += item.quantity;
  }
  cartPrice.innerHTML= "Cart Subtotal: $" + subtotal + ".00";
  window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  window.localStorage.setItem("numCartItems", numCartItems.toString());
}

// flavor container
var flavorContainer = document.getElementById("flavorselect");
if (flavorContainer != null) {
  // Get all buttons with class="btn" inside the container
  var flavorSelections = flavorContainer.getElementsByClassName("selectionitem");
  
  for (var i = 0; i < flavorSelections.length; i++) {
      flavorSelections[i].addEventListener("click", function() {
        var current = flavorContainer.getElementsByClassName("active");
    
        // If there's no active class to begin with
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" active", "");
        }
  
        // Add the active class to the current/clicked button
        this.className += " active";
        document.getElementById('clickflavor').innerHTML = "Flavor: " + this.id;
        curFlavor = this.id;
      });
  }
}

// glaze container
var glazeContainer = document.getElementById("glazeselect");
if (glazeContainer != null) {
  var glazeSelections = glazeContainer.getElementsByClassName("selectionitem");
  
  for (var i = 0; i < glazeSelections.length; i++) {
      glazeSelections[i].addEventListener("click", function() {
        var current = glazeContainer.getElementsByClassName(" active");
    
        // If there's no active class
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" active", "");
        }
  
        // Add the active class to the current/clicked button
        this.className += " active";
        document.getElementById('clickglaze').innerHTML = "Glaze: " + this.id;
        curGlaze = this.id;
      });
  }
}

// quantity container
var quantityContainer = document.getElementById("quantityselect");
if (quantityContainer != null) {
  var quantitySelections = quantityContainer.getElementsByClassName("selectionitem");
  
  for (var i = 0; i < quantitySelections.length; i++) {
      quantitySelections[i].addEventListener("click", function() {
        var current = quantityContainer.getElementsByClassName(" active");
    
        // If there's no active class
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" active", "");
        }
  
        // Add the active class to the current/clicked button
        this.className += " active";
        document.getElementById('clickquantity').innerHTML = "Quantity: " + this.id;
  
        //determine item subtotal by quantity
        document.getElementById('clickprice').innerHTML = "Item Subtotal: $" + this.id + ".00";
        curQuantity = this.id;
      });
  }
}

// rendering the cart
var cartPageItem = document.getElementById('cartpage_cart')

if (cartPageItem != null) {
  cartPageItem.innerHTML = '';
  for(let item of Object.values(cartItems)) {
    var tmpCartItem = new cartItem(item.flavor, item.glaze, item.quantity, item.id);
    cartPageItem.innerHTML += tmpCartItem.getHTML();
  }
  var cartPrice = document.getElementById("cartprice");
  var subtotal = 0;
  for (let item of Object.values(cartItems)) {
    subtotal += item.quantity;
  }
  cartPrice.innerHTML= "Cart Subtotal: $" + subtotal + ".00";
}

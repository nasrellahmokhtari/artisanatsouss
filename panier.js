let panier = JSON.parse(localStorage.getItem("panier")) || [];

function ajouterAuPanier(produit) {
  console.log("Produit à ajouter :", produit);
  const indexProduit = panier.findIndex((item) => item.nom === produit.nom);
  if (indexProduit >= 0) {
    panier[indexProduit].quantite += 1;
  } else {
    produit.quantite = 1;
    panier.push(produit);
  }

  localStorage.setItem("panier", JSON.stringify(panier));
  alert(`${produit.nom} a été ajouté au panier !`);
}

document.querySelectorAll(".btn-add").forEach((button, index) => {
  button.addEventListener("click", () => {
    const produit = {
      nom: document.querySelectorAll(".product h3")[index].textContent.trim(),
      prix: document
        .querySelectorAll(".product .price")
        [index].textContent.trim(),
      description: document
        .querySelectorAll(".product .description")
        [index].textContent.trim(),
      image: document.querySelectorAll(".product img")[index].src,
    };
    ajouterAuPanier(produit);
  });
});


function loadCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const cart = JSON.parse(localStorage.getItem("panier")) || [];  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Votre panier est vide.</p>";
    totalPriceElement.textContent = "Total : 0 MAD";
    return;
  }
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;
  cart.forEach((item, index) => {
    
    const prixNumerique = parseInt(item.prix.replace(" MAD", ""), 10);

    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
            <div class="item-details">
                <img src="${item.image}" alt="${item.nom}" size="10" class="cart-img">
                <h3>${item.nom}</h3>
                <p>${item.description}</p>
                <p>Prix : ${item.prix}</p>
                <label for="quantity-${index}">Quantité :</label>
            <input 
            type="number" 
            id="quantity-${index}" 
            name="quantity" 
            min="1" 
            value="${item.quantite}" 
            data-index="${index}" 
            onchange="updateQuantity(${index}, '${item.nom}', this.value)"
            >                
            <p class="subtotal">Sous-total : ${
          prixNumerique * item.quantite
        } MAD</p>
            </div>
            <button class="btn-remove" data-index="${index}">Retirer</button>
        `;
    cartItemsContainer.appendChild(itemElement);
    totalPrice += prixNumerique * item.quantite;
  });

  totalPriceElement.textContent = `Total : ${totalPrice} MAD`;
  document
    .querySelectorAll(".btn-remove")
    .forEach((button) => button.addEventListener("click", removeItem));
  document
    .querySelectorAll("input[type='number']")
    .forEach((input) => input.addEventListener("change", updateQuantity));
}

function removeItem(event) {
  const index = event.target.dataset.index;
  const cart = JSON.parse(localStorage.getItem("panier")) || [];
  cart.splice(index, 1);
  localStorage.setItem("panier", JSON.stringify(cart));
  loadCart();
}

document.addEventListener("DOMContentLoaded", loadCart);

function updateQuantity(index, nom, newQuantity) {
  let cart = JSON.parse(localStorage.getItem("panier")) || [];
  if (cart[index]) {
    cart[index].quantite = parseInt(newQuantity, 10);
  }

  localStorage.setItem("panier", JSON.stringify(cart));
}

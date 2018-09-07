let buttonAddPayment = document.getElementById('payment_add');
let inputPaymentName = document.getElementById('payment_name');
let inputPaymentCost = document.getElementById('payment_cost');
let table = document.getElementById('table');

function addPayment() {
	//let table = document.getElementById('table');
	var tbody = document.getElementById('table').querySelector("tbody");
	var newRow = document.createElement('tr')
	var tdPayment = document.createElement("td");
	var tdCost = document.createElement("td");
	var tdDelete = document.createElement("td");
	var deleteButton = document.createElement("button");

	tdPayment.innerHTML = inputPaymentName.value;
	tdCost.innerHTML = inputPaymentCost.value;

	newRow.appendChild(tdPayment);
	newRow.appendChild(tdCost);
	for (var i = 0; i < 12; i++) {
		var newtd = document.createElement("td");
		var newCheck = document.createElement("input");
		newCheck.type = "checkbox";
		newtd.appendChild(newCheck);
		newRow.appendChild(newtd);
	}
	deleteButton.className = "delete";
	deleteButton.innerHTML = "&times;";

	tdDelete.appendChild(deleteButton);
	newRow.appendChild(tdDelete);
	tbody.appendChild(newRow);
	updateSum();
}

function checkInput() {
	if(+inputPaymentCost.value <= 0 
		|| !inputPaymentCost.value
		|| !inputPaymentName.value.match(/[а-яa-z]/ig)) {
		buttonAddPayment.disabled = true;
	} else {
		buttonAddPayment.disabled = false;
	}	
}

function updateSum(){
	let newtable = document.getElementById('table');
	var count = 0;
	var paymentArray = {};

	for (var i = 1; i < newtable.rows.length; i++) {
		for (var j = 2; j < 14; j++) {
			if (newtable.rows[i].cells[j].querySelector("input").checked) 
				count++;
		}
		paymentArray[i] = newtable.rows[i].cells[1].innerHTML * count;
		count = 0;
	}
	var sum = document.getElementById('sum');
	var result = 0;

	for (var i = 1; i < newtable.rows.length; i++) {
		result = result + paymentArray[i];
	}

	sum.innerHTML = result;
}

function deleteRow() {
	table.deleteRow(table.rows.length-1);
}

table.querySelector("tbody").addEventListener("click", function(e) {
  if (e.target.nodeName == "BUTTON") {
   	e.target.parentNode.parentNode.remove();
   	updateSum();
  }
  if (e.target.nodeName == "INPUT"){
  	updateSum();
  }
})

window.onload = checkInput;
inputPaymentName.addEventListener("input", checkInput);
inputPaymentCost.addEventListener("input", checkInput);
buttonAddPayment.addEventListener("click", addPayment);
//buttonAddPayment.addEventListener("onmouseup", updateSum);
//buttonAddPayment.onmouseup = updateSum;
//table.addEventListener("", updateSum);onmouseup

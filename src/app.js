import UIController from "./UIController";
import BudgetController from "./BudgetController";


const setupEventListeners = () => {

	const DOM = UIController.getDOMstrings();

	document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

	document.addEventListener('keypress', (e) => {
		if (e.keyCode === 13 || e.witch === 13) {
			ctrlAddItem();
		}
	});

	document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

	document.querySelector(DOM.inputType).addEventListener('change', UIController.changeType);

};

const updatePercantages = () => {
	//calculate percentages
	BudgetController.calculatePercentages();

	//read percentages from the budget controller
	let percentages = BudgetController.getPercentages();

	//update the UI
	UIController.displayPercentages(percentages);
};

const updateBudget = () => {

	//culculate the budget
	BudgetController.calculateBudget();

	//return the budget
	let budget = BudgetController.getBudget();
	
	//display the budget	
	UIController.displayBudget(budget);
}

const ctrlAddItem = () => {

	//get the field and put the data
	let input = UIController.getinput();

	if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
		//add the item to budget controller
		let newItem = BudgetController.addItem(input.type, input.description, input.value);

		//add the item to UI
		UIController.addListItem(newItem, input.type);

		//clear the fields
		UIController.clearFields();

		//calculate and update budget
		updateBudget();

		//calculate and update percentages
		updatePercantages();
	}

};

const ctrlDeleteItem = (event) => {
	let itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

	if(itemID) {
		let splitID = itemID.split('-');
		let type = splitID[0];
		let ID = parseInt(splitID[1]);	

		//delete the item from the data structure
		BudgetController.deleteItem(type, ID);

		//delete the item from the UI
		UIController.deleteListItem(itemID);

		//update budget
		updateBudget();

		//calculate and update percentages
		updatePercantages();
	}

};

const init = () => {
	UIController.displayMonth();
	UIController.displayBudget({
		budget: 0,
		totalInc: 0,
		totalExp: 0,
		percentage: -1
	});
	setupEventListeners();
}

init();
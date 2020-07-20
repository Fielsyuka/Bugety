const BudgetController = (function() {

    class Expence {
      constructor(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
      }

      calcPercentages(totalIncome) {
        if(totalIncome > 0) {
          this.percentage = Math.round((this.value / totalIncome) * 100);         
        } else {
          this.percentage = -1;
        }
      }

      getPercentage() {
        return this.percentage;
      }
    }

    class Income {
      constructor(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
      }
    }

    const calculateTotal = (type) => {
      let sum = 0;
      data.allItems[type].forEach((cur) => {
        sum += cur.value;
      })
      data.totals[type] = sum;
    }

    let allExpences = [];
    let allIncomes = [];
    let totalExpences = 0;

    //object  
    let data = {
      allItems: {
        exp: [],
        inc: [],
      },
      totals: {
        exp: 0,
        inc: 0,
      },
      budget: 0,
      percentage: -1 //not exsist at this point
    }

    return {
      addItem: (type, des, val) => {
        var ID, newItem;

        //create new ID
        if(data.allItems[type].length > 0) {
          ID = data.allItems[type][data.allItems[type].length -1].id + 1;         
        } else {
          ID = 0;
        }

        //create new item based on 'inc' or 'exp'
        if(type === 'exp') {
          newItem = new Expence(ID, des, val);
        } else if (type === 'inc') {
          newItem = new Income(ID, des, val);
        }

        //push it into our data structure
        data.allItems[type].push(newItem);

        //return the new element
        return newItem;

      },

      deleteItem: (type, id) => {

        // //type（inc or exp）ごとのallItemの配列をcurrentにコピー
        // let ids = data.allItems[type].map((current) => {
        //  //currentにコピーした配列のオブジェクトのうちidを返す
        //  return current.id;
        // });

        // //消去対象のidが何番目かをindexに代入
        // let index = ids.indexOf(id);

        // if(index !== -1) {
        //  //allItemのindex番目の要素を１つ削除
        //  data.allItems[type].splice(index, 1);
        // }

        //ES6 filterを使って配列をから削除対象以外の要素を抽出
        data.allItems[type] = data.allItems[type].filter(item => item.id !== id);
      },

      calculateBudget: () => {

        //calculate total income and expences
        calculateTotal('exp');
        calculateTotal('inc');

        //calculate the budget: income - expenses
        data.budget = data.totals.inc - data.totals.exp;

        //calculate the percentage of income that we spent
        if(data.totals.inc > 0) {
          data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);          
        } else {
          data.percentage = -1;
        }
      },

      calculatePercentages: () => {
        data.allItems.exp.forEach((cur) => {
          cur.calcPercentages(data.totals.inc);
        });
      },

      getPercentages: () => {
        let allPerc = data.allItems.exp.map((cur) => {
          return cur.getPercentage();
        });
        return allPerc;
      },

      getBudget: () => {
        return {
          budget: data.budget,
          totalInc: data.totals.inc,
          totalExp: data.totals.exp,
          percentage: data.percentage
        };
      },

      testing: () => {
        console.log(data);
      }
    } 

})();

export default BudgetController;

const User=require('../model/user');
const Expense=require('../model/expense')
exports.premiumLeaderBoard=async (req,res)=>{
    const users=await User.findAll();
    const expenses=await Expense.findAll();
    expenseLeaderBoard={};

    expenses.forEach(expense => {
        if(expenseLeaderBoard[expense.userId]){
            expenseLeaderBoard[expense.userId]=expenseLeaderBoard[expense.userId]+expense.amount;

        } 
        else{
            expenseLeaderBoard[expense.userId]=+expense.amount;
        }    
    });
    console.log(expenseLeaderBoard);
    let userLeaerBoardDetails=[]

    users.forEach(user=>{
        userLeaerBoardDetails.push({name:user.username,total_cost:expenseLeaderBoard[user.id]||0})
    })

    userLeaerBoardDetails.sort((a,b)=>b.total_cost-a.total_cost)
    res.status(200).json(userLeaerBoardDetails)

}
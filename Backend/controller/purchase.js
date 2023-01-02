const Razorpay = require('razorpay');
const Order = require('../model/order')
const userController = require('./user')



const purchasepremium =async (req, res) => {
    try {
        let userId=req.result.id;
  var rzp = new Razorpay({
    key_id:'rzp_test_okzNi3Xajv2I2A',
    key_secret:'G721sM9ZemesnliD14qvSDHt'
  });
  const amount = 3000;

  rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
    if (err) {
      throw new Error(err);
    }
    Order.create({ orderid: order.id, status: "PENDING" ,userId:userId})
      .then(() => {
        return res.status(201).json({ order, key_id: rzp.key_id });
      })
      .catch((err) => {
        throw new Error(err);
      });
  });
} catch (err) {
  console.log(err);
  res.status(403).json({ message: "Sometghing went wrong", error: err });
}
}

 const updateTransactionStatus = async (req, res ) => {
    console.log(req.body);
    try {
        // const userId = req.result.id;
        const { payment_id, order_id} = req.body;
        const order  = await Order.findOne({where : {orderid : order_id}}) //2
        const promise1 =  order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}) 
        const promise2 =  req.result.update({ ispremiumuser: true }) 

        Promise.all([promise1, promise2]).then(()=> {
            return res.status(202).json({sucess: true, message: "Transaction Successful",token:userController.generateAccesToken1(req.result.id,true)});
        }).catch((error ) => {
            throw new Error(error)
        })

        
                
    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}
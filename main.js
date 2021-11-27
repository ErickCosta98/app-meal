let mealsState = []
const stringToHtml = (str) =>{
    const parser = new DOMParser()
    const doc = parser.parseFromString(str,'text/html')

return doc.body.firstChild
}
const renderItem = (item) => {
    const lis = stringToHtml(`<li data-id="${item._id}">${item.name}</li>`)
    lis.addEventListener('click',() =>{
        const mealsList = document.getElementById('meals-list')
        Array.from(mealsList.children).forEach(x => x.classList.remove('selected'))
        lis.classList.add('selected')
        const mealsid = document.getElementById('meals-id')
        mealsid.value = item._id
        // lis.classList.remove('selected')
    })
    return lis
}
const renderOrder = (order,meals) =>{
    const meal = meals.find(x => x._id === order.meal_id)
    const lis = stringToHtml(`<li data-id="${order._id}">${meal.name}-${order.user_id}</li>`)
    return lis
}


window.onload = () =>{
    const orderForm = document.getElementById('order')
    orderForm.onsubmit = (e) => {
        e.preventDefault()
        const btnGn = document.getElementById('btnGenerar')
        btnGn.setAttribute('disabled',true)
        const mealId = document.getElementById('meals-id')
        const mealIdvalue = mealId.value
        if(!mealIdvalue){
            alert('Debe seleccionar un plato')
        }
        const order = {
            meal_id : mealIdvalue,
            user_id : 'Erick Hernandez 2' 
        }
    fetch('https://serverless-erickcosta98.vercel.app/api/orders',{
        method:'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(order)
    }).then(x => x.json())
    .then(response => {
        const renderedOrder = renderOrder(response,mealsState)
        const ordersList = document.getElementById('orders-list')
        ordersList.appendChild(renderedOrder)
        btnGn.removeAttribute('disabled')
    })
    


    }
    fetch('https://serverless-erickcosta98.vercel.app/api/meals')
    .then(res => res.json())
    .then(data => {
        mealsState = data
        const mealsList = document.getElementById('meals-list')
        const btn = document.getElementById('btnGenerar')
        const listItems = data.map(renderItem)
        mealsList.removeChild(mealsList.firstElementChild)
        listItems.forEach(element => mealsList.appendChild(element))
        btn.removeAttribute('disabled')
        fetch('https://serverless-erickcosta98.vercel.app/api/orders')
        .then(response => response.json())
        .then(ordersData => {
            const ordersList = document.getElementById('orders-list')
            const lisOrders = ordersData.map(orderData => renderOrder(orderData,data))
           ordersList.removeChild(ordersList.firstElementChild)
           lisOrders.forEach(element => ordersList.appendChild(element))
        } )
    })
}


// method: 'GET',
// mode: 'cors',
// credentials: 'same-origin',
// headers:{
//     'Content-Type': 'application/json'
// },
// redirect: 'follow',
// body: JSON.stringify({})
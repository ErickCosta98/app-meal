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


window.onload = () =>{
    fetch('https://serverless-erickcosta98.vercel.app/api/meals')
    .then(res => res.json())
    .then(data => {
        const mealsList = document.getElementById('meals-list')
        const btn = document.getElementById('btnGenerar')
        const listItems = data.map(renderItem)
        mealsList.removeChild(mealsList.firstElementChild)
        listItems.forEach(element => mealsList.appendChild(element))
        btn.removeAttribute('disabled')
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
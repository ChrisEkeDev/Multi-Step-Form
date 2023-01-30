let section = 1;
let scrollPosition = 0;
let formContainer = document.getElementById('form_container');
let screenWidth = window.innerWidth;
let nextButton = document.querySelector('.next_step');
let prevButton = document.querySelector('.go_back');
let sectionNodes = document.querySelectorAll('.form-section_node');
let planType = 'monthly';
let changePlanBtn = document.querySelector('.change_plan');
let switchPlanBtn = document.querySelector('.plan_type_container');
let planNode = document.querySelector('.plan_node-container');
let planMonthly = document.querySelector('.plan_monthly');
let planYearly = document.querySelector('.plan_yearly');
let arcadePlan = document.querySelector('.arcade_plan');
let advancedPlan = document.querySelector('.advanced_plan');
let proPlan = document.querySelector('.pro_plan');
let arcadePrice = document.querySelector('.arcade_price');
let advancePrice = document.querySelector('.advanced_price');
let proPrice = document.querySelector('.pro_price');
let planDeals = document.querySelectorAll('.plan_deal');
let addOns = document.querySelectorAll('.checkbox_group');
let plans = document.querySelectorAll('.plan-radio_group');
let onlineServiceAddOn = document.querySelector('.os_add_on')
let largerStorageAddOn = document.querySelector('.ls_add_on')
let customProfileAddOn = document.querySelector('.cp_add_on')
let onlineServicePrice = document.querySelector('.os_price');
let largerStoragePrice = document.querySelector('.ls_price');
let customProfilePrice = document.querySelector('.cp_price');
let summaryPlanLabel = document.querySelector('.form_details-plan_title');
let summaryPlanPrice = document.querySelector('.form_details-plan_price')
let addOnsContainer = document.querySelector('.add_ons_container')
let selectedPlan = {};
let selectedAddOns = [];
let totalPrice = document.querySelector('.detail_total');
let totalPriceLabel = document.querySelector('.detail_label');



window.onload = checkScreen();
window.onload = sectionNodes[section - 1].classList.add('active_node');

function checkScreen() {
    if (section === 1) {
        prevButton.classList.add('disabled_btn');
    } else if (section === 5) {
        nextButton.classList.add('disabled_btn');
    } else if (section !== 5 && section !== 1) {
        nextButton.classList.remove('disabled_btn');
        prevButton.classList.remove('disabled_btn');
    }
    if (section === 4) {
        nextButton.classList.add('submit_btn');
        nextButton.innerHTML = 'Confirm';
    } else {
        nextButton.classList.remove('submit_btn')
        nextButton.innerHTML = 'Next Step';
    }
    sectionNodes.forEach(function(node) {
        node.classList.remove('active_node');
    })
    sectionNodes[section - 1].classList.add('active_node');

}
function nextSection() {
    if (section === 5) {
        return
    }
    formContainer.style.transform = "translateX(" + -(scrollPosition + screenWidth) + "px" + ")";
    section += 1;
    scrollPosition += screenWidth;
}


function prevSection() {
    if ( section === 1) {
        return
    }
    formContainer.style.transform = "translateX(" + -(scrollPosition - screenWidth) + "px" + ")";
    section -= 1;
    scrollPosition -= screenWidth;

}

changePlanBtn.addEventListener('click', function() {
    formContainer.style.transform = "translateX(" + -(scrollPosition - (screenWidth* 2)) + "px" + ")";
    section -= 2;
    scrollPosition -= (screenWidth * 2);
    checkScreen();
})

nextButton.addEventListener('click', function() {
    nextSection();
    checkScreen();
})

prevButton.addEventListener('click', function() {
    prevSection();
    checkScreen();
})

function checkPlan() {
    if (planType === 'monthly') {
        planNode.classList.replace("on_yearly", "on_monthly");
        planMonthly.classList.replace("inactive_plan", "active_plan");
        planYearly.classList.replace("active_plan", "inactive_plan");
        arcadePrice.innerHTML = "$9/mo";
        advancePrice.innerHTML = "$12/mo";
        proPrice.innerHTML = "$15/mo";
        onlineServicePrice.innerHTML = "+$1/mo";
        largerStoragePrice.innerHTML = "+$2/mo";
        customProfilePrice.innerHTML = "+$2/mo";
        planDeals.forEach( function(plan) {
            plan.classList.add('hidden');
        })
    } else {
        planNode.classList.replace("on_monthly", "on_yearly");
        planMonthly.classList.replace("active_plan", "inactive_plan");
        planYearly.classList.replace("inactive_plan", "active_plan");
        arcadePrice.innerHTML = "$90/yr";
        advancePrice.innerHTML = "$120/yr";
        proPrice.innerHTML = "$150/yr";
        onlineServicePrice.innerHTML = "+$10/yr";
        largerStoragePrice.innerHTML = "+$20/yr";
        customProfilePrice.innerHTML = "+$20/yr";
        planDeals.forEach( function(plan) {
            plan.classList.remove('hidden');
        })
    }
}

function clearPlans() {
    plans.forEach( function(plan) {
        plan.classList.remove('selected_plan')
    })
    selectedPlan = {};
}

function recalculate() {
    populateSummary();
    populateAddOns()
    calculateTotals();
}

function calculateTotals() {
    let sum = 0;
    for (let i = 0; i < selectedAddOns.length; i++) {
        if (planType === 'monthly') {
            sum += selectedAddOns[i].month
        } else {
            sum += selectedAddOns[i].year
        }
    }
    if (planType === 'monthly') {
        sum += selectedPlan.month;
        totalPrice.innerHTML = `$${sum}/mo`;
        totalPriceLabel.innerHTML = 'Total (per month)';
    } else {
        sum += selectedPlan.year;
        totalPrice.innerHTML = `$${sum}/year`;
        totalPriceLabel.innerHTML = 'Total (per year)';
    }
}

function populateSummary() {
    if (planType === 'monthly') {
        summaryPlanLabel.innerHTML = `${selectedPlan.name} (Monhtly)`;
        summaryPlanPrice.innerHTML = `$${selectedPlan.month}/mo`
    } else {
        summaryPlanLabel.innerHTML = `${selectedPlan.name} (Yearly)`;
        summaryPlanPrice.innerHTML = `$${selectedPlan.year}/yr`
    }
}

function populateAddOns() {
    addOnsContainer.replaceChildren()
    if (selectedAddOns.length === 0) {
        addOnsContainer.classList.remove('add_ons_with_items');
    }
    selectedAddOns.forEach(function(addOn) {
        let cont = document.createElement('div');
        cont.classList.add('flex-row-space');
        let addOnLabel = document.createElement('p');
        addOnLabel.innerHTML = addOn.name;
        let addOnPrice = document.createElement('p');
        if (planType === 'monthly') {
            addOnPrice.innerHTML = `+$${addOn.month}/mo`
        } else {
            addOnPrice.innerHTML = `+$${addOn.year}/yr`
        }
        addOnLabel.classList.add('add_on_summary_label');
        addOnPrice.classList.add('add_on_summary_price');
        cont.append(addOnLabel, addOnPrice);
        addOnsContainer.classList.add('add_ons_with_items');
        addOnsContainer.append(cont)
    })
}

arcadePlan.addEventListener('click', function() {
    clearPlans();
    arcadePlan.classList.add('selected_plan');
    selectedPlan = {
        name: 'Arcade',
        month: 9,
        year: 90
    }
    recalculate();
})

advancedPlan.addEventListener('click', function() {
    clearPlans();
    advancedPlan.classList.add('selected_plan');
    selectedPlan = {
        name: 'Advanced',
        month: 12,
        year: 120
    }
    recalculate();
})

proPlan.addEventListener('click', function() {
    clearPlans();
    proPlan.classList.add('selected_plan');
    selectedPlan = {
        name: 'Pro',
        month: 15,
        year: 150
    }
    recalculate();
})

onlineServiceAddOn.addEventListener('click', function(e) {
    e.preventDefault();
    let checkbox = onlineServiceAddOn.children.item(1);
    let addOnItem = {
        name: 'Online Services',
        month: 1,
        year: 10
    }
    if (onlineServiceAddOn.classList.contains('selected_add_on')) {
        checkbox.replaceChildren();
        let newArray = selectedAddOns.filter(addOn => addOn.name !== 'Online Services');
        selectedAddOns = newArray;
    } else {
        let checkmark = document.createElement('img');
        checkmark.setAttribute('src', 'assets/images/icon-checkmark.svg');
        checkbox.appendChild(checkmark);
        selectedAddOns = [...selectedAddOns, addOnItem]
    }
    onlineServiceAddOn.classList.toggle('selected_add_on');
    checkbox.classList.toggle('checked_square');
    recalculate();
})

largerStorageAddOn.addEventListener('click', function(e) {
    e.preventDefault();
    let checkbox = largerStorageAddOn.children.item(1);
    let addOnItem = {
        name: 'Larger Storage',
        month: 2,
        year: 20
    }
    if (largerStorageAddOn.classList.contains('selected_add_on')) {
        checkbox.replaceChildren();
        let newArray = selectedAddOns.filter(addOn => addOn.name !== 'Larger Storage');
        selectedAddOns = newArray;
    } else {
        let checkmark = document.createElement('img');
        checkmark.setAttribute('src', 'assets/images/icon-checkmark.svg');
        checkbox.appendChild(checkmark);
        selectedAddOns = [...selectedAddOns, addOnItem]
    }
    largerStorageAddOn.classList.toggle('selected_add_on');
    checkbox.classList.toggle('checked_square');
    recalculate();
})

customProfileAddOn.addEventListener('click', function(e) {
    e.preventDefault();
    let checkbox = customProfileAddOn.children.item(1);
    let addOnItem = {
        name: 'Customizable Profile',
        month: 2,
        year: 20
    }
    if (customProfileAddOn.classList.contains('selected_add_on')) {
        checkbox.replaceChildren();
        let newArray = selectedAddOns.filter(addOn => addOn.name !== 'Customizable Profile');
        selectedAddOns = newArray;
    } else {
        let checkmark = document.createElement('img');
        checkmark.setAttribute('src', 'assets/images/icon-checkmark.svg');
        checkbox.appendChild(checkmark);
        selectedAddOns = [...selectedAddOns, addOnItem]
    }
    customProfileAddOn.classList.toggle('selected_add_on');
    checkbox.classList.toggle('checked_square');
    recalculate();
})


switchPlanBtn.addEventListener('click', function() {
    if (planType === 'monthly') {
        planType = 'yearly'
    } else {
        planType = 'monthly'
    }
    checkPlan();
    recalculate();
})

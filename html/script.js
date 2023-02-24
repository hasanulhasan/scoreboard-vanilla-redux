const incrementEl = document.getElementById('incrementForm')
const decrementEl = document.getElementById('decrementForm')

const scoreBoardEl = document.getElementById('scoreBoard')
const add_match = document.getElementById('add_match')
const reset = document.getElementById('reset')
const match_row = document.getElementById('all-matches container')

const initialState = {
  value: 0,
  matchDiv: [`<div class="match">
  <div class="wrapper">
      <button class="lws-delete">
          <img src="./image/delete.svg" alt="" />
      </button>
      <h3 class="lws-matchName">Match 1</h3>
  </div>
  <div class="inc-dec">
      <form id="incrementForm" class="incrementForm">
          <h4>Increment</h4>
          <input id="increment" type="number" name="increment" class="lws-increment" />
      </form>
      <form id="decrementForm" class="decrementForm">
          <h4>Decrement</h4>
          <input id="decrement" type="number" name="decrement" class="lws-decrement" />
      </form>
  </div>
  <div class="numbers">
      <h2 id="scoreBoard" class="lws-singleResult">0</h2>
  </div>
</div>`]
}

function counterReducer(state = initialState, action) {
  if (action.type === 'increment') {
    return {
      ...state,
      value: state.value + action.payload
    }
  }
  else if (action.type === 'decrement') {
    if ((state.value - action.payload) <= 0) {
      return {
        ...state,
        value: state.value = 0
      }
    }
    else {
      return {
        ...state,
        value: state.value - action.payload
      }
    }
  }
  else if (action.type === 'add_match') {
    return {
      ...state,
      matchDiv: [...state.matchDiv, action.payload]
    }
  }
  else if (action.type === 'reset') {
    return {
      ...state,
      value: state.value = 0
    }
  }
  else { return state }
}

const store = Redux.createStore(counterReducer);


const render = () => {
  const state = store.getState();

  if (state.matchDiv.length <= 1) {
    scoreBoardEl.innerText = state.value.toString();
  }
  else {
    let matchDivEl = document.createElement('div');
    match_row.innerHTML = '';
    state.matchDiv.forEach((count, i) => {
      matchDivEl = document.createElement('div');
      matchDivEl.innerHTML = state.matchDiv[i]
      match_row.appendChild(matchDivEl)
    })
  }
}

render();
store.subscribe(render)

incrementEl.addEventListener('submit', (e) => {
  e.preventDefault()
  store.dispatch({
    type: 'increment',
    payload: parseInt(e.target.increment.value)
  })

})

decrementEl.addEventListener('submit', (e) => {
  e.preventDefault()
  store.dispatch({
    type: 'decrement',
    payload: parseInt(e.target.decrement.value)
  })
})

reset.addEventListener('click', () => {
  store.dispatch({
    type: 'reset'
  })
})

add_match.addEventListener('click', () => {
  store.dispatch({
    type: 'add_match',
    payload: `<div class="match">
    <div class="wrapper">
        <button class="lws-delete">
            <img src="./image/delete.svg" alt="" />
        </button>
        <h3 class="lws-matchName">Match 1</h3>
    </div>
    <div class="inc-dec">
        <form id="incrementForm" class="incrementForm">
            <h4>Increment</h4>
            <input id="increment" type="number" name="increment" class="lws-increment" />
        </form>
        <form id="decrementForm" class="decrementForm">
            <h4>Decrement</h4>
            <input id="decrement" type="number" name="decrement" class="lws-decrement" />
        </form>
    </div>
    <div class="numbers">
        <h2 id="scoreBoard" class="lws-singleResult">0</h2>
    </div>
</div>`
  })
})
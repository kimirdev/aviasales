import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setSortMethod } from '../../store/ticketsReducer'
import { BY_PRICE, BY_DURATION, OPTIMAL } from '../../utils/sort'

import './tabs.scss'

function Tabs() {
  const [chosen, setChosen] = useState('default')

  const dispatch = useDispatch()

  const handleTabClick = (sortMethod) => {
    dispatch(setSortMethod({ sortMethod }))
    setChosen(sortMethod)
  }

  return (
    <ul className="tabs">
      <li>
        <button
          className={`tab tab-cheapest${chosen === BY_PRICE && ' active'}`}
          type="button"
          onClick={() => handleTabClick(BY_PRICE)}
        >
          САМЫЙ ДЕШЕВЫЙ
        </button>
      </li>
      <li>
        <button
          className={`tab tab-fastest${chosen === BY_DURATION && ' active'}`}
          type="button"
          onClick={() => handleTabClick(BY_DURATION)}
        >
          САМЫЙ БЫСТРЫЙ
        </button>
      </li>
      <li>
        <button
          className={`tab tab-optimal${chosen === OPTIMAL && ' active'}`}
          type="button"
          onClick={() => handleTabClick(OPTIMAL)}
        >
          ОПТИМАЛЬНЫЙ
        </button>
      </li>
    </ul>
  )
}

export default Tabs

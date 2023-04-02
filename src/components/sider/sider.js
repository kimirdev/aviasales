import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleAllFilter, toggleFilter } from '../../store/ticketsReducer'
import './sider.scss'

function Sider() {
  const dispatch = useDispatch()
  const filter = useSelector((store) => store.tickets.filter)
  const filterAll = useSelector((store) => store.tickets.filterAll)

  const toggleTransfer = (idx) => {
    dispatch(toggleFilter({ idx }))
  }

  const toggleAllTransfers = () => {
    dispatch(toggleAllFilter())
  }

  return (
    <div className="sider">
      <p className="sider-title">количество пересадок</p>
      <ul>
        <li>
          <label htmlFor="all" className="transfer-control">
            <input id="all" type="checkbox" checked={filterAll} onChange={toggleAllTransfers} />
            Все
          </label>
        </li>
        <li>
          <label htmlFor="no-transfer" className="transfer-control">
            <input id="no-transfer" type="checkbox" checked={filter[0]} onChange={() => toggleTransfer(0)} />
            Без пересадок
          </label>
        </li>
        <li>
          <label htmlFor="one-transfer" className="transfer-control">
            <input id="one-transfer" type="checkbox" checked={filter[1]} onChange={() => toggleTransfer(1)} />1
            пересадка
          </label>
        </li>
        <li>
          <label htmlFor="two-transfer" className="transfer-control">
            <input id="two-transfer" type="checkbox" checked={filter[2]} onChange={() => toggleTransfer(2)} />2
            пересадки
          </label>
        </li>
        <li>
          <label htmlFor="three-transfer" className="transfer-control">
            <input id="three-transfer" type="checkbox" checked={filter[3]} onChange={() => toggleTransfer(3)} />3
            пересадки
          </label>
        </li>
      </ul>
    </div>
  )
}

export default Sider

import { Layout } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Sider from '../sider'
import Tabs from '../tabs'
import TicketList from '../ticket-list'
import { getSortMethod } from '../../utils/sort'
import { fetchSearchId, fetchTickets } from '../../store/ticketsReducer'

import './app.scss'

import logo from './logo.svg'

const { Header } = Layout

function App() {
  const isSearchIdInit = useSelector((state) => state.tickets.isSearchIdInit)
  const isStop = useSelector((state) => state.tickets.isStop)
  const tickets = useSelector((state) => state.tickets.tickets)
  const toShow = useSelector((store) => store.tickets.toShow)
  const sortMethod = useSelector((store) => store.tickets.sortMethod)
  const filter = useSelector((store) => store.tickets.filter)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSearchId())

    return () => {
      sessionStorage.clear()
    }
  }, [dispatch])

  useEffect(() => {
    if (!isStop && isSearchIdInit) {
      dispatch(fetchTickets())
    }
  }, [dispatch, isStop, isSearchIdInit, tickets])

  return (
    <Layout className="layout">
      <Header className="header">
        <img src={logo} alt="logo" className="logo" />
      </Header>
      <Layout className="content">
        <Sider />
        <div className="tickets">
          <Tabs />
          <TicketList
            tickets={[...tickets]
              .filter((t) => t.segments.every((s) => filter[s.stops.length]))
              .sort(getSortMethod(sortMethod))
              .slice(0, toShow)}
          />
        </div>
      </Layout>
    </Layout>
  )
}

export default App

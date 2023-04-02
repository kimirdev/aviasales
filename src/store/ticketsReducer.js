import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  filterAll: true,
  filter: [true, true, true, true],
  isSearchIdInit: false,
  isLoading: false,
  isStop: false,
  tickets: [],
  toShow: 5,
  sortMethod: 'default',
}

export const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('https://aviasales-test-api.kata.academy/search')
    if (!res.ok) throw new Error(`${res.status}`)

    return await res.json()
  } catch (err) {
    return rejectWithValue(err)
  }
})

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { rejectWithValue }) => {
  try {
    const searchId = sessionStorage.getItem('searchId')
    const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
    if (!res.ok) throw new Error(`${res.status}`)

    return await res.json()
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

const tickets = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    toggleFilter(store, action) {
      const filter = store.filter.map((x, idx) => (idx === action.payload.idx ? !x : x))
      return {
        ...store,
        filterAll: filter.every((x) => x),
        filter,
      }
    },
    toggleAllFilter(store) {
      if (store.filterAll) {
        return { ...store, filterAll: false, filter: [false, false, false, false] }
      }
      return { ...store, filterAll: true, filter: initialState.filter }
    },
    showMore(store) {
      return { ...store, toShow: store.toShow + 5 }
    },
    setSortMethod(store, action) {
      return {
        ...store,
        sortMethod: action.payload.sortMethod,
      }
    },
  },
  extraReducers: {
    [fetchSearchId.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [fetchSearchId.fulfilled]: (state, action) => {
      sessionStorage.setItem('searchId', action.payload.searchId)
      return {
        ...state,
        isSearchIdInit: true,
        isLoading: false,
      }
    },
    [fetchTickets.pending]: (state) => ({
      ...state,
      isLoading: true,
    }),
    [fetchTickets.fulfilled]: (state, action) => ({
      ...state,
      tickets: [...state.tickets, ...action.payload.tickets],
      isLoading: !action.payload.stop,
      isStop: action.payload.stop,
    }),
    [fetchTickets.rejected]: (state) => ({
      ...state,
      tickets: [...state.tickets],
    }),
  },
})

export const { toggleFilter, toggleAllFilter, showMore, setSortMethod } = tickets.actions

export default tickets.reducer

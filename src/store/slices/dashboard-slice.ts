import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum EFilters {
  gameIds = 'gameIds',
}

export interface IDashboardFilters {
  [EFilters.gameIds]?: string[];
}
export type DashboardState = {
  filters: IDashboardFilters;
};

export const dashboardFiltersInitialState = {
  gameIds: [],
};

const slice = createSlice({
  name: 'dashboard',
  initialState: {
    filters: dashboardFiltersInitialState,
  } as DashboardState,
  reducers: {
    setDashboardFilters: (
      state,
      { payload }: PayloadAction<IDashboardFilters>,
    ) => {
      state.filters = {
        ...state.filters,
        ...payload,
      };
    },
  },
});

export const { setDashboardFilters } = slice.actions;

export default slice.reducer;

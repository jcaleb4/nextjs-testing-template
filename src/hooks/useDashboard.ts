import { RootState } from '@/store';
import {
  EFilters,
  IDashboardFilters,
  dashboardFiltersInitialState,
  setDashboardFilters,
} from '@/store/slices/dashboard-slice';
import { useDispatch, useSelector } from 'react-redux';

const useDashboard = () => {
  const dispatch = useDispatch();

  const filters = useSelector((state: RootState) => state.dashboard.filters);

  const setDashFilters = (filters: IDashboardFilters) => {
    dispatch(setDashboardFilters(filters));
  };

  const clearDashFilters = () => {
    dispatch(setDashboardFilters(dashboardFiltersInitialState));
  };

  const stringFilters = (key: EFilters): string => {
    return filters[key]?.join(',') ?? '';
  };

  return { clearDashFilters, setDashFilters, stringFilters, filters };
};

export default useDashboard;

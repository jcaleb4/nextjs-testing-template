import { FC, useCallback, useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import useDashboard from '@/hooks/useDashboard';
import { Fragment } from 'react';
import { useOnClickOutside } from '@/hooks/useClickOutside';
import { FunnelIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export interface IMultiSelectionOption {
  name: string;
  value: string;
}

interface IMultiSelectionMenu {
  options?: IMultiSelectionOption[];
  title?: string;
}

const MultiSelectionMenu: FC<IMultiSelectionMenu> = ({ title, options }) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    filters: { gameIds },
    setDashFilters,
    clearDashFilters,
  } = useDashboard();
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState<string[]>(gameIds || []);

  const handleSelection = (value: string) => {
    setSelection((prevState) => {
      if (prevState.includes(value)) {
        return prevState.filter((item) => item !== value);
      }
      return [...prevState, value];
    });
  };

  useOnClickOutside(
    ref,
    useCallback(() => {
      setIsOpen(false);
    }, []),
  );

  if (!options) {
    return null;
  }

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex space-x-1">
        <FunnelIcon className="h-5 w-5 text-gray-950" aria-hidden="true" />
        <ChevronDownIcon className="h-5 w-5 text-gray-950" aria-hidden="true" />
      </button>
      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute right-0">
          <div className="bg-white border border-slate-200 rounded shadow-lg overflow-hidden mt-1 whitespace-nowrap text-gray-950 flex flex-col text-sm p-4">
            <div className="flex flex-col space-y-2 pb-3">
              {title && (
                <header className="border-b border-slate-200 pb-2">
                  <h4 className="font-semibold">{title}</h4>
                </header>
              )}
              <div className="overflow-y-auto max-h-32">
                {options.map((game) => (
                  <div
                    key={game.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded"
                      checked={selection.includes(game.value)}
                      onChange={() => handleSelection(game.value)}
                      id={game.value}
                    />
                    <label htmlFor={game.value} className="cursor-pointer">
                      {game.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-4 pt-4 border-t border-slate-200">
              <button
                className="btn danger flex-1"
                onClick={() => {
                  clearDashFilters();
                  setSelection([]);
                  setIsOpen(false);
                }}
              >
                Clear
              </button>
              <button
                className="btn warning flex-1"
                onClick={() => {
                  setSelection(gameIds || []);
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="btn flex-1"
                onClick={() => {
                  setDashFilters({ gameIds: selection });
                  setIsOpen(false);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default MultiSelectionMenu;

/**
 *
 * FesSelect
 *
 */
import React, { memo } from 'react';
import AsyncSelect from 'react-select/async';
import { listCode } from 'services/goldenTicket';
import styled from 'styled-components/macro';
interface Props {
  onChange: any;
  defaultOptions: any;
  options: any;
}

export const FesSelect = memo(
  ({ options, defaultOptions, onChange }: Props) => {
    const handleChange = value => {
      onChange('users', value);
    };

    // const colourOptions = [
    //   { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    //   { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    //   { value: 'purple', label: 'Purple', color: '#5243AA' },
    //   { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    //   { value: 'orange', label: 'Orange', color: '#FF8B00' },
    //   { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    //   { value: 'green', label: 'Green', color: '#36B37E' },
    //   { value: 'forest', label: 'Forest', color: '#00875A' },
    //   { value: 'slate', label: 'Slate', color: '#253858' },
    //   { value: 'silver', label: 'Silver', color: '#666666' },
    // ];

    const filterColors = (inputValue: string) => {
      return options.filter(
        i =>
          i?.label?.toLowerCase().includes(inputValue?.toLowerCase()) ||
          i?.sublabel?.toLowerCase().includes(inputValue?.toLowerCase()),
      );
    };

    const promiseOptions = inputValue =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(filterColors(inputValue));
        }, 1000);
      });

    // const passData = data => {
    //   const option = {};
    //   const passing: any[] = [];
    //   data.map(item => {
    //     option['value'] = item._id;
    //     option['label'] = item.code;
    //     passing.push(option);
    //     return item;
    //   });
    //   return passing;
    // };

    // const getListOptions = async inputValue => {
    //   const res = await listCode(`golden-ticket/list-user?search=${inputValue}`);
    //   return passData(res.data);
    // };

    return (
      <Div>
        <AsyncSelect
          isMulti
          cacheOptions
          value={defaultOptions}
          openMenuOnClick={false}
          onMenuOpen={false}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          defaultOptions
          loadOptions={promiseOptions}
          onChange={handleChange}
        />
      </Div>
    );
  },
);

const Div = styled.div`
  width: 80%;
`;

/*import { RadioGroup } from '@headlessui/react'
import { useController } from "react-hook-form";

import { classNames } from '../libs/frontend/utils'

import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/20/solid';

export const RadioGroupStars = (props) => {
  const {
    field: { value, onChange }
  } = useController(props);

  const { items } = props;

  return (
    <>
      <RadioGroup
        value={value}
        onChange={onChange}
        className="w-full my-1">
        <RadioGroup.Label className="sr-only"> Choose a option </RadioGroup.Label>
        <div className="flex flex-row-reverse justify-center gap-1">
          {items.map((item) => (
            <RadioGroup.Option
              key={item}
              value={item}
              className={({ active, checked }) =>
                classNames(
                  'cursor-pointer text-gray-200',
                  'flex-1 hover:text-yellow-600',
                  'peer',
                  'peer-hover:text-yellow-600 peer-checked:text-yellow-500',
                  active ? 'text-yellow-500' : '',
                  checked ? 'text-yellow-500' : '',
                )
              }
            >
              <RadioGroup.Label as={StarIconSolid} className='' />
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </>
  );
}*/
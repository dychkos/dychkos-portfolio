"use client";
const ChangeLocale: React.FC = () => {
  return (
    <fieldset>
      <div>
        <label
          htmlFor="ColorBlack"
          className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
        >
          <input
            type="radio"
            name="ColorOption"
            value="ColorBlack"
            id="ColorBlack"
            className="sr-only"
            checked
          />

          <p className="text-sm font-medium">UA</p>
        </label>
      </div>

      <div>
        <label
          htmlFor="ColorRed"
          className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
        >
          <input
            type="radio"
            name="ColorOption"
            value="ColorRed"
            id="ColorRed"
            className="sr-only"
          />

          <p className="text-sm font-medium">EN</p>
        </label>
      </div>
    </fieldset>
  );
};

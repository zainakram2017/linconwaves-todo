type PageHeaderProps = {
  title: string;
  description: string;
  buttonText: string;
  actionHandler: () => void;
};

const PageHeader = ({ title, description,buttonText, actionHandler }: PageHeaderProps) => {
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          {title}
        </h1>
        <p className="mt-2 text-sm text-gray-700">{description}</p>
      </div>
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          onClick={actionHandler}
          type="button"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
         {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PageHeader;

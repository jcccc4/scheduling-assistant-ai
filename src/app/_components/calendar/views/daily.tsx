const DailyView = () => (
    <div data-testid="daily-view" className="w-full">
      <div className="bg-white h-10 flex items-center justify-center">
        {new Date().getDate()}
      </div>
    </div>
  );

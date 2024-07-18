"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setRules } from "@/store/slices/formSlice";
import Footer from "./Footer";
import Header from "./Header";

const HostRulesStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const dispatch = useDispatch();
  const rules = useSelector((state: RootState) => state.form.rules);
  
  // State variables initialized with Redux state values
  const [checkInTime, setCheckInTime] = useState<string>(rules.check_in_time || "15:00");
  const [checkOutTime, setCheckOutTime] = useState<string>(rules.check_out_time || "11:00");
  const [selfCheckIn, setSelfCheckIn] = useState<boolean>(rules.self_check_in || true);
  const [noSmoking, setNoSmoking] = useState<boolean>(rules.no_smoking || true);
  const [noPartiesOrEvents, setNoPartiesOrEvents] = useState<boolean>(rules.no_parties_or_events || false);
  const [carbonMonoxideAlarm, setCarbonMonoxideAlarm] = useState<boolean>(rules.carbon_monoxide_alarm || true);
  const [smokeAlarm, setSmokeAlarm] = useState<boolean>(rules.smoke_alarm || true);
  const [securityDeposit, setSecurityDeposit] = useState<number | string>(rules.security_deposit || 200);

  // Update local state when Redux state changes
  useEffect(() => {
    setCheckInTime(rules.check_in_time || "15:00");
    setCheckOutTime(rules.check_out_time || "11:00");
    setSelfCheckIn(rules.self_check_in || true);
    setNoSmoking(rules.no_smoking || true);
    setNoPartiesOrEvents(rules.no_parties_or_events || false);
    setCarbonMonoxideAlarm(rules.carbon_monoxide_alarm || true);
    setSmokeAlarm(rules.smoke_alarm || true);
    setSecurityDeposit(rules.security_deposit || 200);
  }, [rules]);

  // Handler to dispatch Redux action to update rules
  const handleNext = () => {
    dispatch(setRules({
      check_in_time: checkInTime,
      check_out_time: checkOutTime,
      self_check_in: selfCheckIn,
      no_smoking: noSmoking,
      no_parties_or_events: noPartiesOrEvents,
      carbon_monoxide_alarm: carbonMonoxideAlarm,
      smoke_alarm: smokeAlarm,
      security_deposit: Number(securityDeposit),
    }));
    onNext();
  };

  // Validation for completeness
  const isComplete = checkInTime !== "" && checkOutTime !== "" && !isNaN(Number(securityDeposit));

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex justify-center px-4 py-8 bg-zinc-200">
        <div className="max-w-xl w-full space-y-8 p-8 m-12 h-fit rounded-lg shadow-xl bg-white">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 py-4">
              Set your host rules
            </h2>
            <p className="mt-2 text-center text-lg text-gray-600">
              Define the rules and safety measures for your property.
            </p>
          </div>
          <div>
            <label htmlFor="check-in-time" className="block text-sm font-medium text-gray-700">
              Check-in Time
            </label>
            <input
              type="time"
              name="check-in-time"
              id="check-in-time"
              className="mt-1 block w-full border-2 rounded-md p-4 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-lg"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="check-out-time" className="block text-sm font-medium text-gray-700">
              Check-out Time
            </label>
            <input
              type="time"
              name="check-out-time"
              id="check-out-time"
              className="mt-1 block w-full border-2 rounded-md p-4 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-lg"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="self-check-in"
              id="self-check-in"
              className="mr-2 h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              checked={selfCheckIn}
              onChange={(e) => setSelfCheckIn(e.target.checked)}
            />
            <label htmlFor="self-check-in" className="text-sm font-medium text-gray-700">
              Self Check-in
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="no-smoking"
              id="no-smoking"
              className="mr-2 h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              checked={noSmoking}
              onChange={(e) => setNoSmoking(e.target.checked)}
            />
            <label htmlFor="no-smoking" className="text-sm font-medium text-gray-700">
              No Smoking
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="no-parties-or-events"
              id="no-parties-or-events"
              className="mr-2 h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              checked={noPartiesOrEvents}
              onChange={(e) => setNoPartiesOrEvents(e.target.checked)}
            />
            <label htmlFor="no-parties-or-events" className="text-sm font-medium text-gray-700">
              No Parties or Events
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="carbon-monoxide-alarm"
              id="carbon-monoxide-alarm"
              className="mr-2 h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              checked={carbonMonoxideAlarm}
              onChange={(e) => setCarbonMonoxideAlarm(e.target.checked)}
            />
            <label htmlFor="carbon-monoxide-alarm" className="text-sm font-medium text-gray-700">
              Carbon Monoxide Alarm
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="smoke-alarm"
              id="smoke-alarm"
              className="mr-2 h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              checked={smokeAlarm}
              onChange={(e) => setSmokeAlarm(e.target.checked)}
            />
            <label htmlFor="smoke-alarm" className="text-sm font-medium text-gray-700">
              Smoke Alarm
            </label>
          </div>
          <div>
            <label htmlFor="security-deposit" className="block text-sm font-medium text-gray-700">
              Security Deposit (USD)
            </label>
            <input
              type="number"
              name="security-deposit"
              id="security-deposit"
              className="mt-1 block w-full border-2 rounded-md p-4 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-lg"
              placeholder="Enter security deposit amount"
              value={securityDeposit}
              onChange={(e) => setSecurityDeposit(e.target.value)}
              min="0"
              step="1"
            />
          </div>
        </div>
      </main>
      <Footer onBack={onBack} onNext={handleNext} isNextDisabled={!isComplete} />
    </div>
  );
};

export default HostRulesStep;

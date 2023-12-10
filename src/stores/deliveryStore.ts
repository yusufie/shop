// deliveryStore.ts
import create from "zustand";

type ButtonType = "express" | "morning" | "noon" | "afternoon" | "evening";

interface DeliveryStore {
  selectedButtons: {
    express: ButtonType | null;
    morning: ButtonType | null;
    noon: ButtonType | null;
    afternoon: ButtonType | null;
    evening: ButtonType | null;
  };
  handleButtonClick: (buttonType: ButtonType) => void;
  getSelectedTime: () => string | null;
  getDeliverySchedule: () => string | null;
}

export const DELIVERY_SCHEDULES: Record<ButtonType, string> = {
  express: "90 min express delivery",
  morning: "8:00 AM - 11:00 AM",
  noon: "11:00 AM - 2:00 PM",
  afternoon: "2:00 PM - 5:00 PM",
  evening: "5:00 PM - 8:00 PM",
};

const useDeliveryStore = create<DeliveryStore>((set, get) => ({
  selectedButtons: {
    express: null,
    morning: null,
    noon: null,
    afternoon: null,
    evening: null,
  },
  handleButtonClick: (buttonType) => {
    set(() => ({
      selectedButtons: {
        express: null,
        morning: null,
        noon: null,
        afternoon: null,
        evening: null,
        [buttonType]:
          get().selectedButtons[buttonType] === buttonType ? null : buttonType,
      },
    }));
  },
  getSelectedTime: () => {
    const selectedButtons = get().selectedButtons;
    const selectedButtonArray: (ButtonType | null)[] = [
      selectedButtons.express,
      selectedButtons.morning,
      selectedButtons.noon,
      selectedButtons.afternoon,
      selectedButtons.evening,
    ];
    const selectedButton = selectedButtonArray.find((time) => time !== null);
    return selectedButton ? DELIVERY_SCHEDULES[selectedButton] : null;
  },

  getDeliverySchedule: () => {
    const selectedButtons = get().selectedButtons;
    const selectedButtonArray: (ButtonType | null)[] =
      Object.values(selectedButtons);
    const selectedButton = selectedButtonArray.find((time) => time !== null);
    return selectedButton
      ? DELIVERY_SCHEDULES[selectedButton as ButtonType]
      : null;
  },
}));

export default useDeliveryStore;

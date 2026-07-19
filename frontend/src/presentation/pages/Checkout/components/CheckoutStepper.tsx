/*
 * descripcion: Componente visual del stepper de pasos del checkout (Carrito → Envío → Pago).
 */

interface CheckoutStepperProps {
  currentStep: 1 | 2 | 3;
  onStepClick: (step: 1 | 2 | 3) => void;
}

const STEPS = [
  { number: 1 as const, label: 'Carrito' },
  { number: 2 as const, label: 'Envío' },
  { number: 3 as const, label: 'Pago' },
];

export function CheckoutStepper({ currentStep, onStepClick }: CheckoutStepperProps) {
  return (
    <div className="w-full flex items-center justify-between border-b border-outline-variant pb-md relative">
      <div className="absolute top-1/2 left-0 w-full h-px bg-surface-container-highest -z-10" />
      {STEPS.map(({ number, label }) => {
        const isActive = currentStep >= number;
        const isClickable = number === 1 || (number === 2 && currentStep >= 2) || (number === 3 && currentStep === 3);
        return (
          <div
            key={number}
            className={`flex flex-col items-center gap-xs bg-background px-sm ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={() => isClickable && onStepClick(number)}
          >
            <div
              className={`w-8 h-8 rounded border flex items-center justify-center font-label-md text-label-md transition-colors ${
                isActive
                  ? 'border-primary bg-primary-container text-on-primary-container shadow-[2px_2px_0px_rgba(0,0,0,0.4)]'
                  : 'border-outline-variant bg-surface-container text-on-surface-variant'
              }`}
            >
              {number}
            </div>
            <span
              className={`font-label-sm text-label-sm uppercase tracking-wider ${
                isActive ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

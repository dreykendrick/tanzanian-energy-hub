-- Create fuel_prices table
CREATE TABLE public.fuel_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fuel_type text NOT NULL,
  price_per_liter numeric(10,2) NOT NULL,
  region text DEFAULT 'Dar es Salaam',
  effective_date date NOT NULL DEFAULT CURRENT_DATE,
  source text DEFAULT 'manual',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.fuel_prices ENABLE ROW LEVEL SECURITY;

-- Anyone can view fuel prices
CREATE POLICY "Anyone can view fuel prices"
ON public.fuel_prices
FOR SELECT
USING (true);

-- Admins can manage fuel prices
CREATE POLICY "Admins can manage fuel prices"
ON public.fuel_prices
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_fuel_prices_updated_at
BEFORE UPDATE ON public.fuel_prices
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert default fuel prices for Tanzania (EWURA regulated prices as of late 2024)
INSERT INTO public.fuel_prices (fuel_type, price_per_liter, region, effective_date, source) VALUES
('Diesel', 3231.00, 'Dar es Salaam', CURRENT_DATE, 'EWURA'),
('Petrol', 3271.00, 'Dar es Salaam', CURRENT_DATE, 'EWURA'),
('Kerosene', 3189.00, 'Dar es Salaam', CURRENT_DATE, 'EWURA');
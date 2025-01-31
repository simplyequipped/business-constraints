import React from 'react';
import EconomicDataComponent from '../components/EconomicDataComponent';

{/* TODO dynamically set safe observation dates */}

export default function EconomicData() {
    return (
      <>
        <EconomicDataComponent
          seriesId='BBKMGDP'
          observationStart='2021-01-01'
          observationEnd='2024-01-01'
          frequency='m'
          titleOverride='Real Gross Domestic Product'
          yLabelOverride='% Change'
          citationText='Indiana University. Indiana Business Research Center, Brave-Butters-Kelley Real Gross Domestic Product [BBKMGDP], retrieved from FRED, Federal Reserve Bank of St. Louis; https://fred.stlouisfed.org/series/BBKMGDP'
        />
        <EconomicDataComponent
          seriesId='DFF'
          observationStart='2021-01-01'
          observationEnd='2024-01-01'
          frequency='m'
          titleOverride='Effective Federal Interest Rate'
          yLabelOverride='%'
          citationText='Board of Governors of the Federal Reserve System (US), Federal Funds Effective Rate [DFF], retrieved from FRED, Federal Reserve Bank of St. Louis; https://fred.stlouisfed.org/series/DFF'
        />
        <EconomicDataComponent
          seriesId='USALOLITOAASTSAM'
          observationStart='2021-01-01'
          observationEnd='2024-01-01'
          frequency='m'
          titleOverride='Composite Leading Indicator'
          yLabelOverride='Index'
          citationText='Organization for Economic Co-operation and Development, Leading Indicators OECD: Leading Indicators: Composite Leading Indicator: Amplitude Adjusted for United States [USALOLITOAASTSAM], retrieved from FRED, Federal Reserve Bank of St. Louis; https://fred.stlouisfed.org/series/USALOLITOAASTSAM'
        />
        <EconomicDataComponent
          seriesId='T5YIE'
          observationStart='2021-01-01'
          observationEnd='2024-01-01'
          frequency='m'
          titleOverride='Inflation Expectations (5-Year)'
          yLabelOverride='%'
          citationText='Federal Reserve Bank of St. Louis, 5-Year Breakeven Inflation Rate [T5YIE], retrieved from FRED, Federal Reserve Bank of St. Louis; https://fred.stlouisfed.org/series/T5YIE'
        />
      </>
    );
}






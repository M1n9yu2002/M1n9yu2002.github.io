import {escapeHTML as e} from './utils.mjs';

const coord = value => {
 if (!Number.isFinite(value)) throw Error('Invalid customer-risk chart value');
 return Number(value.toFixed(3));
};

function scatterSvg(data, mobile){
 const width=mobile?360:1120, height=mobile?475:665;
 const plot=mobile?{left:45,right:344,top:64,bottom:383}:{left:95,right:1060,top:66,bottom:550};
 const x=value=>coord(plot.left+(value/20)*(plot.right-plot.left));
 const y=value=>coord(plot.bottom-(value/12)*(plot.bottom-plot.top));
 const id=mobile?'risk-scatter-mobile':'risk-scatter-desktop';
 const xTicks=[0,5,10,15,20].map(value=>`<g><line x1="${x(value)}" x2="${x(value)}" y1="${plot.top}" y2="${plot.bottom}" class="risk-grid"/><text x="${x(value)}" y="${plot.bottom+(mobile?20:26)}" text-anchor="middle" class="risk-tick">${value}</text></g>`).join('');
 const yTicks=[0,3,6,9,12].map(value=>`<g><line x1="${plot.left}" x2="${plot.right}" y1="${y(value)}" y2="${y(value)}" class="risk-grid"/><text x="${plot.left-(mobile?11:18)}" y="${y(value)+4}" text-anchor="end" class="risk-tick">${value}</text></g>`).join('');
 const points=data.scatter.map(point=>{
  const cx=x(point.High_Exposure_Events),cy=y(point.FOMO_Count);
  const attributes=`data-x="${point.High_Exposure_Events}" data-y="${point.FOMO_Count}" data-status="${e(point.PnL_Status)}" data-selected="${point.Selected}"`;
  return point.PnL_Status==='Profit'
   ?`<circle cx="${cx}" cy="${cy}" r="${mobile?2.8:4.2}" class="risk-point-profit" ${attributes}/>`
   :`<rect x="${coord(cx-(mobile?2.5:3.8))}" y="${coord(cy-(mobile?2.5:3.8))}" width="${mobile?5:7.6}" height="${mobile?5:7.6}" class="risk-point-loss" ${attributes}/>`;
 }).join('');
 const rings=data.scatter.filter(point=>point.Selected).map(point=>`<circle cx="${x(point.High_Exposure_Events)}" cy="${y(point.FOMO_Count)}" r="${mobile?6.5:10}" class="risk-selected-ring"/>`).join('');
 const legend=mobile
  ?`<g transform="translate(45 24)"><circle cx="0" cy="0" r="3.5" class="risk-legend-profit"/><text x="9" y="4" class="risk-legend-label">Profit</text><rect x="75" y="-3.5" width="7" height="7" class="risk-legend-loss"/><text x="89" y="4" class="risk-legend-label">Loss</text><circle cx="160" cy="0" r="5.5" class="risk-selected-ring"/><text x="173" y="4" class="risk-legend-label">Selected</text></g>`
  :`<g transform="translate(95 25)"><circle cx="0" cy="0" r="4" class="risk-legend-profit"/><text x="14" y="4" class="risk-legend-label">Profit</text><rect x="105" y="-4" width="8" height="8" class="risk-legend-loss"/><text x="127" y="4" class="risk-legend-label">Loss</text><circle cx="225" cy="0" r="7" class="risk-selected-ring"/><text x="246" y="4" class="risk-legend-label">Selected cohort</text></g>`;
 return `<svg class="risk-chart ${mobile?'risk-chart-mobile':'risk-chart-desktop'}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">High exposure events and FOMO-like buy counts</title><desc id="${id}-desc">Scatter plot of 1,000 customers. Profit and loss use different point shapes and colours; the 40 selected customers have red outlines.</desc>${legend}${xTicks}${yTicks}${points}${rings}<text x="${coord((plot.left+plot.right)/2)}" y="${mobile?435:615}" text-anchor="middle" class="risk-axis-label">High exposure events</text><text transform="translate(${mobile?14:29} ${coord((plot.top+plot.bottom)/2)}) rotate(-90)" text-anchor="middle" class="risk-axis-label">FOMO-like buy count</text>${mobile?'':`<text x="${coord((plot.left+plot.right)/2)}" y="641" text-anchor="middle" class="risk-axis-hint">Trades &gt;50% of reconstructed pre-transaction balance</text>`}</svg>`;
}

function pnlSvg(data,mobile){
 const width=mobile?360:1120, height=mobile?1040:950;
 const plot=mobile?{left:72,right:348,top:55,step:22}:{left:160,right:1080,top:58,step:20};
 const bottom=plot.top+40*plot.step;
 const x=value=>coord(plot.left+((value+120000)/200000)*(plot.right-plot.left));
 const zero=x(0);
 const id=mobile?'risk-pnl-mobile':'risk-pnl-desktop';
 const ticks=[-100000,-50000,0,50000].map(value=>`<g><line x1="${x(value)}" x2="${x(value)}" y1="${plot.top-8}" y2="${bottom}" class="${value===0?'risk-zero-line':'risk-grid'}"/><text x="${x(value)}" y="${bottom+(mobile?21:29)}" text-anchor="middle" class="risk-tick">${value===0?'0':`${value/1000}K`}</text></g>`).join('');
 const bars=data.pnl.map((point,i)=>{
  const value=Number(point.Net_PnL);
  if(!Number.isFinite(value))throw Error('Invalid Net PnL');
  const endpoint=x(value),left=Math.min(zero,endpoint),barWidth=Math.abs(endpoint-zero),barTop=coord(plot.top+i*plot.step+(mobile?4:4));
  return `<g><text x="${plot.left-(mobile?9:17)}" y="${coord(barTop+(mobile?10:11))}" text-anchor="end" class="risk-customer-label">${e(point.Customer_ID)}</text><rect x="${coord(left)}" y="${barTop}" width="${coord(barWidth)}" height="${mobile?13:12}" class="${value>=0?'risk-bar-profit':'risk-bar-loss'}" data-customer="${e(point.Customer_ID)}" data-value="${value}"><title>${e(point.Customer_ID)}: ${value.toLocaleString('en-US',{style:'currency',currency:'USD'})}</title></rect></g>`;
 }).join('');
 return `<svg class="risk-chart ${mobile?'risk-chart-mobile':'risk-chart-desktop'}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">Net PnL across the selected customer cohort</title><desc id="${id}-desc">Diverging horizontal bars show both positive and negative Net PnL for all 40 selected customer IDs, ordered from highest profit to greatest loss.</desc><text x="${mobile?5:12}" y="${mobile?24:27}" class="risk-axis-label">Customer ID</text>${ticks}${bars}<text x="${coord((plot.left+plot.right)/2)}" y="${mobile?1003:923}" text-anchor="middle" class="risk-axis-label">Net PnL ($)</text></svg>`;
}

export function renderExposureFomo(data){
 if(data.scatter.length!==1000||data.scatter.filter(point=>point.Selected).length!==40)throw Error('Customer-risk scatter data mismatch');
 return scatterSvg(data,false)+scatterSvg(data,true);
}

export function renderSelectedPnl(data){
 if(data.pnl.length!==40)throw Error('Customer-risk PnL data mismatch');
 return pnlSvg(data,false)+pnlSvg(data,true);
}

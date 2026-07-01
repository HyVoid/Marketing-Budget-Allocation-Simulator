import React, { useState } from 'react';
import { Channel, HistoricalRow, CHANNELS } from '../types';
import { Trash2, Edit3, Plus, Search, Filter, AlertCircle, Sparkles, Check } from 'lucide-react';

interface HistoricalLedgerProps {
  historicalData: HistoricalRow[];
  onAddRow: (row: Omit<HistoricalRow, 'id'>) => void;
  onDeleteRow: (id: string) => void;
  onUpdateRow: (row: HistoricalRow) => void;
}

export default function HistoricalLedger({
  historicalData,
  onAddRow,
  onDeleteRow,
  onUpdateRow,
}: HistoricalLedgerProps) {
  // Filters
  const [channelFilter, setChannelFilter] = useState<string>('ALL');
  const [monthFilter, setMonthFilter] = useState<string>('');

  // Add Row Form States
  const [showAddForm, setShowAddForm] = useState(false);
  const [formMonth, setFormMonth] = useState('2025-12');
  const [formChannel, setFormChannel] = useState<Channel>('Google Ads');
  const [formSpend, setFormSpend] = useState('');
  const [formLeads, setFormLeads] = useState('');
  const [formBookedJobs, setFormBookedJobs] = useState('');
  const [formRevenue, setFormRevenue] = useState('');

  // Edit Row States
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editSpend, setEditSpend] = useState('');
  const [editLeads, setEditLeads] = useState('');
  const [editBookedJobs, setEditBookedJobs] = useState('');
  const [editRevenue, setEditRevenue] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const spend = parseFloat(formSpend) || 0;
    const leads = parseInt(formLeads) || 0;
    const bookedJobs = parseInt(formBookedJobs) || 0;
    const revenue = parseFloat(formRevenue) || 0;

    if (bookedJobs > leads) {
      alert('Validation Error: Booked Jobs cannot exceed Leads volume!');
      return;
    }

    onAddRow({
      month: formMonth,
      channel: formChannel,
      spend,
      leads,
      bookedJobs,
      revenue,
    });

    // Clear form
    setFormSpend('');
    setFormLeads('');
    setFormBookedJobs('');
    setFormRevenue('');
    setShowAddForm(false);
  };

  const handleStartEditing = (row: HistoricalRow) => {
    setEditingRowId(row.id);
    setEditSpend(row.spend.toString());
    setEditLeads(row.leads.toString());
    setEditBookedJobs(row.bookedJobs.toString());
    setEditRevenue(row.revenue.toString());
  };

  const handleSaveEdit = (row: HistoricalRow) => {
    const spend = parseFloat(editSpend) || 0;
    const leads = parseInt(editLeads) || 0;
    const bookedJobs = parseInt(editBookedJobs) || 0;
    const revenue = parseFloat(editRevenue) || 0;

    if (bookedJobs > leads) {
      alert('Validation Error: Booked Jobs cannot exceed Leads volume!');
      return;
    }

    onUpdateRow({
      ...row,
      spend,
      leads,
      bookedJobs,
      revenue,
    });

    setEditingRowId(null);
  };

  // Filter and sort the ledger data
  const filteredData = historicalData
    .filter(row => {
      const matchChannel = channelFilter === 'ALL' || row.channel === channelFilter;
      const matchMonth = !monthFilter || row.month.includes(monthFilter);
      return matchChannel && matchMonth;
    })
    .sort((a, b) => b.month.localeCompare(a.month) || a.channel.localeCompare(b.channel));

  // Format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-8 animate-fade-up">
      
      {/* Search and Filters panel */}
      <div className="bg-white rounded-[14px] card-shadow p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Channel selector filter */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#888888] block">Filter by Channel</span>
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold text-[#051C2C] bg-white border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2251FF]"
            >
              <option value="ALL">All Marketing Channels</option>
              {CHANNELS.map(ch => (
                <option key={ch} value={ch}>{ch}</option>
              ))}
            </select>
          </div>

          {/* Month input filter */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#888888] block">Search Month</span>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. 2025-10"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs text-[#051C2C] bg-white border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2251FF] w-36"
              />
              <Search size={12} className="absolute left-2.5 top-2.5 text-[#888888]" />
            </div>
          </div>

        </div>

        {/* Add record trigger */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1 px-4 py-2 bg-[#2251FF] hover:bg-opacity-90 text-white rounded-lg text-xs font-semibold tracking-wide shadow-sm hover:translate-y-[-1px] active:scale-[0.97] transition-all duration-150"
        >
          <Plus size={14} />
          {showAddForm ? 'Hide Form' : 'Insert Monthly Log'}
        </button>
      </div>

      {/* Dynamic Add Form Drawer */}
      {showAddForm && (
        <div className="bg-white rounded-[14px] card-shadow p-6 border-l-4 border-[#2251FF] animate-fade-up">
          <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles mb-4">
            Log New Historical Month Operations
          </h3>

          <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
            
            {/* Month */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Month (YYYY-MM)</label>
              <input
                type="text"
                value={formMonth}
                onChange={(e) => setFormMonth(e.target.value)}
                className="w-full px-3 py-2 text-[12px] text-[#051C2C] bg-[#F5F5F2] border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-white transition-all duration-150"
                required
              />
            </div>

            {/* Channel Selection */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Channel</label>
              <select
                value={formChannel}
                onChange={(e) => setFormChannel(e.target.value as Channel)}
                className="w-full px-3 py-2 text-[12px] text-[#051C2C] bg-[#F5F5F2] border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-white transition-all duration-150"
              >
                {CHANNELS.map(ch => (
                  <option key={ch} value={ch}>{ch}</option>
                ))}
              </select>
            </div>

            {/* Spend */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Spend ($)</label>
              <input
                type="number"
                placeholder="0"
                value={formSpend}
                onChange={(e) => setFormSpend(e.target.value)}
                className="w-full px-3 py-2 text-[12px] text-[#051C2C] bg-[#F5F5F2] border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-white transition-all duration-150"
                required
              />
            </div>

            {/* Leads */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Leads</label>
              <input
                type="number"
                placeholder="0"
                value={formLeads}
                onChange={(e) => setFormLeads(e.target.value)}
                className="w-full px-3 py-2 text-[12px] text-[#051C2C] bg-[#F5F5F2] border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-white transition-all duration-150"
                required
              />
            </div>

            {/* Booked Jobs */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Booked Jobs</label>
              <input
                type="number"
                placeholder="0"
                value={formBookedJobs}
                onChange={(e) => setFormBookedJobs(e.target.value)}
                className="w-full px-3 py-2 text-[12px] text-[#051C2C] bg-[#F5F5F2] border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-white transition-all duration-150"
                required
              />
            </div>

            {/* Revenue */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-[#888888]">Revenue ($)</label>
              <input
                type="number"
                placeholder="0"
                value={formRevenue}
                onChange={(e) => setFormRevenue(e.target.value)}
                className="w-full px-3 py-2 text-[12px] text-[#051C2C] bg-[#F5F5F2] border border-[#E8E8E6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2251FF] focus:bg-white transition-all duration-150"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3 lg:col-span-6 flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2251FF] hover:bg-opacity-90 text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                Insert Record
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Historical Logs Ledger Grid */}
      <div className="bg-white rounded-[14px] card-shadow overflow-hidden">
        <div className="p-6 border-b border-[#E8E8E6] flex items-center justify-between">
          <h3 className="text-xl font-garamond font-bold brand-text tracking-tight-titles">Historical Performance Ledger</h3>
          <span className="text-[11px] font-mono text-[#888888] bg-[#F5F5F2] px-3 py-1 rounded-full">
            Showing {filteredData.length} of {historicalData.length} months
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[rgba(5,28,44,0.03)] border-b border-[rgba(5,28,44,0.08)]">
                <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C]">Month</th>
                <th className="py-3.5 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C]">Channel</th>
                <th className="py-3.5 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">Spend</th>
                <th className="py-3.5 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">Leads</th>
                <th className="py-3.5 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">Booked Jobs</th>
                <th className="py-3.5 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">Revenue</th>
                <th className="py-3.5 px-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-right">ROAS</th>
                <th className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-[0.06em] text-[#051C2C] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-[12px]">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 px-4 text-center text-[#888888]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle size={24} className="text-[#888888]/60" />
                      <span>No matching operations records found. Update filters.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((row, idx) => {
                  const isEditing = editingRowId === row.id;
                  const calculatedRoas = row.spend > 0 ? (row.revenue / row.spend).toFixed(2) : '0.00';

                  return (
                    <tr 
                      key={row.id} 
                      className={`transition-colors duration-150 ${
                        isEditing ? 'bg-[#FFFDE7]' : idx % 2 === 0 ? 'bg-[#F5F5F2]/20' : 'bg-white'
                      }`}
                    >
                      {/* Month Column */}
                      <td className="py-3 px-4 font-semibold text-[#051C2C]">{row.month}</td>
                      
                      {/* Channel Column */}
                      <td className="py-3 px-3 font-semibold text-[#051C2C]">{row.channel}</td>
                      
                      {/* Spend Column */}
                      <td className="py-3 px-3 text-right font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editSpend}
                            onChange={(e) => setEditSpend(e.target.value)}
                            className="w-24 px-2 py-0.5 text-right font-mono text-[12px] text-[#051C2C] bg-white border border-[#E8E8E6] rounded"
                          />
                        ) : (
                          formatCurrency(row.spend)
                        )}
                      </td>

                      {/* Leads Column */}
                      <td className="py-3 px-3 text-right font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editLeads}
                            onChange={(e) => setEditLeads(e.target.value)}
                            className="w-20 px-2 py-0.5 text-right font-mono text-[12px] text-[#051C2C] bg-white border border-[#E8E8E6] rounded"
                          />
                        ) : (
                          row.leads
                        )}
                      </td>

                      {/* Booked Jobs Column */}
                      <td className="py-3 px-3 text-right font-mono">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editBookedJobs}
                            onChange={(e) => setEditBookedJobs(e.target.value)}
                            className="w-20 px-2 py-0.5 text-right font-mono text-[12px] text-[#051C2C] bg-white border border-[#E8E8E6] rounded"
                          />
                        ) : (
                          row.bookedJobs
                        )}
                      </td>

                      {/* Revenue Column */}
                      <td className="py-3 px-3 text-right font-mono font-semibold text-[#2251FF]">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editRevenue}
                            onChange={(e) => setEditRevenue(e.target.value)}
                            className="w-24 px-2 py-0.5 text-right font-mono text-[12px] text-[#051C2C] bg-white border border-[#E8E8E6] rounded"
                          />
                        ) : (
                          formatCurrency(row.revenue)
                        )}
                      </td>

                      {/* Expected ROAS Column */}
                      <td className="py-3 px-3 text-right font-mono font-semibold text-[#051C2C]">
                        {isEditing ? (
                          <span className="text-[#888888] italic">Calculated</span>
                        ) : (
                          `${calculatedRoas}x`
                        )}
                      </td>

                      {/* Actions Column */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2.5">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleSaveEdit(row)}
                                className="p-1 text-[#00C853] hover:bg-[#00C853]/10 rounded transition-all duration-150"
                                title="Save Edit"
                              >
                                <Check size={14} />
                              </button>
                              <button
                                onClick={() => setEditingRowId(null)}
                                className="p-1 text-[#888888] hover:bg-slate-100 rounded transition-all duration-150 font-semibold"
                                title="Cancel"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleStartEditing(row)}
                                className="p-1 text-[#2251FF] hover:bg-[#2251FF]/10 rounded transition-all duration-150"
                                title="Edit Record"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('Delete this historical entry permanently?')) {
                                    onDeleteRow(row.id);
                                  }
                                }}
                                className="p-1 text-[#D32F2F] hover:bg-[#D32F2F]/10 rounded transition-all duration-150"
                                title="Delete Record"
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

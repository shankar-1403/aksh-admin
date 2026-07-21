import React,{useState} from 'react'
import TablePagination from '../component/TablePagination'
import ModalCloseButton from '../../../pcred_crm/src/components/ModalCloseButton';
import { useSheets } from '../hooks/useSheets';
import { usePagination } from '../../../pcred_crm/src/hooks/usePagination';
import { db } from '../lib/firebase';
import { push, ref, set } from 'firebase/database';

function Dashboard() {
  const {sheets} = useSheets();
  const [modalOpen,setModalOpen]=useState(false);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({heading:'',sheet_link_id:''});

  async function saveLead(e) {
    e.preventDefault()
    if (!form.heading.trim() || !form.sheet_link_id.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    setSaving(true)
    try {
      const payload = {
        heading: form.heading.trim(),
        sheet_link_id: form.sheet_link_id.trim(),
        createdAt: Date.now(),
      }

      const newRef = push(ref(db, "sheets"));
      await set(newRef, payload);
      setForm({
        heading: "",
        sheet_link_id: "",
      });
      setModalOpen(false)
    } finally {
      setSaving(false)
    }
  }

  const {
    page: tablePage,
    setPage: setTablePage,
    pageSize: tablePageSize,
    setPageSize: setTablePageSize,
    total: tableTotal,
    totalPages: tableTotalPages,
    pageItems: tablePageItems,
  } = usePagination(sheets)
  return (
    <>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          
        </div>
        <div className="flex items-end justify-end w-full">
          <div>
            <button type="button" onClick={()=>setModalOpen(true)} className="w-full rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-500">New Sheet</button>
          </div>
        </div>
      </div>

      <div className="max-w-full min-w-0 rounded-xl border border-slate-800 bg-slate-900/40 [-webkit-overflow-scrolling:touch] mt-4">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-2 font-medium whitespace-nowrap">Sr No.</th>
                <th className="px-4 py-2 font-medium whitespace-nowrap">Header</th>
                <th className="px-4 py-2 font-medium whitespace-nowrap">Sheet Link</th>
                <th className="px-4 py-2 font-medium whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sheets.map((data,index)=>(
                <tr key={data._id} className="text-slate-300">
                  <td className="px-4 py-1 text-slate-400 whitespace-nowrap">{index+1}</td>
                  <td className="px-4 py-1 text-slate-400 whitespace-nowrap">{data.heading}</td>
                  <td className="px-4 py-1 text-slate-400 whitespace-nowrap">{data.sheet_link_id}</td>
                  <td className="px-4 py-1 text-slate-400 whitespace-nowrap">
                    <button className='bg-transparent border border-blue-500 rounded-lg text-xs px-2 py-1'>Activate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination
          page={tablePage}
          totalPages={tableTotalPages}
          totalItems={tableTotal}
          pageSize={tablePageSize}
          onPageChange={setTablePage}
          onPageSizeChange={setTablePageSize}
        />

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto overflow-x-visible rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-2xl sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="lead-modal-title"
            >
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-semibold text-white">New sheet</h2>
                <ModalCloseButton onClick={() => setModalOpen(false)} />
              </div>
  
              <form onSubmit={saveLead} className="mt-6 space-y-4">
                <div>
                  <label className="mb-4" htmlFor="heading">Heading</label>
                  <input name='heading' value={form.heading} onChange={(e) => setForm({...form,heading: e.target.value})} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30" />
                </div>
                <div>
                  <label className="mb-4" htmlFor="sheet_link_id">Sheet Link ID</label>
                  <input name='sheet_link_id' value={form.sheet_link_id} onChange={(e) => setForm({...form,sheet_link_id: e.target.value})} className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900/40 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
                  >
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard
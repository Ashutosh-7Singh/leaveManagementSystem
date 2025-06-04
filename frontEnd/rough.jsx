return (
  <div className="user-pending-container">
    <div className="header-container">
      <h2>Pending Leaves</h2>
      <button className="apply-leave-btn" onClick={() => setShowModal(true)}>
        + Apply Leave
      </button>
    </div>

    {showModal && (
      <div className="modal-overlay">
        {/* Modal content remains the same */}
      </div>
    )}

    <table className="pending-table">
      {/* Table content remains the same */}
    </table>
  </div>
);
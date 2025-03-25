import React from 'react'

export const CharacterCard = (printComponentRef) => {
  return (
    <div 
      className="print-content" 
      ref={printComponentRef}
      style={{
        width: "138mm",
        height: "95mm",
        padding: "5mm",
        boxSizing: "border-box",
        overflow: "hidden"
      }}
    >
      <div style={{ display: "flex" }}>
        {/* Left column */}
        <div style={{ width: "40%", paddingRight: "3mm" }}>
          <h2 style={{ fontSize: "10pt", marginBottom: "2mm" }}>{selectedCharacter.name}</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2mm", fontSize: "8pt" }}>
            <div>Player:</div>
            <div>Court:</div>
            <div>XP:</div>
            <div>CourtXP:</div>
            <div>Bank:</div>
            <div>Deaths:</div>
            <div>Body:</div>
            <div>Skill:</div>
          </div>
        </div>
        
        {/* Right column */}
        <div style={{ width: "60%" }}>
          <div style={{ fontSize: "8pt", marginBottom: "2mm" }}>
            <div>Learned Skills:</div>
            <div className="border border-gray-300 p-1" style={{ height: "25mm", overflow: "auto" }}>
              List Skills Here
            </div>
          </div>
          
          <div style={{ display: "flex", gap: "2mm", fontSize: "8pt" }}>
            <div style={{ width: "50%" }}>
              <div>Boons:</div>
              <div className="border border-gray-300 p-1" style={{ height: "25mm", overflow: "auto" }}>
                List Boons Here
              </div>
            </div>
            <div style={{ width: "50%" }}>
              <div>Banes:</div>
              <div className="border border-gray-300 p-1" style={{ height: "25mm", overflow: "auto" }}>
                List Banes Here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

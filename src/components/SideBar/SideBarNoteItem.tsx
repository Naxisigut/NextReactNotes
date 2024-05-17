import SidebarNoteItemContent from './SidebarNoteItemContent';

export default function SideBarNoteItem({ itemData:{ noteId, noteTitle, expandedChildren, header} }:{
  itemData: {
    noteId: string,
    noteTitle: string,
    expandedChildren: React.ReactNode
    header: React.ReactNode
  }
}) {
  return (
    <SidebarNoteItemContent 
      id={noteId}
      title={noteTitle}
      expandedChildren={ expandedChildren }
    >
      { header }
    </SidebarNoteItemContent>
  )
};

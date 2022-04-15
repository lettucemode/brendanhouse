/* eslint-disable */
// taken from https://github.com/uptick/react-keyed-file-browser/blob/master/src/actions/default.js
// and modified for our purposes

import { useRef } from 'react';
import PropTypes from 'prop-types';

const Actions = (props) => {
  const {
    selectedItems,
    isFolder,
    icons,
    nameFilter,

    canCreateFolder,
    onCreateFolder,

    canRenameFile,
    onRenameFile,

    canRenameFolder,
    onRenameFolder,

    canDeleteFile,
    onDeleteFile,

    canDeleteFolder,
    onDeleteFolder,

    canDownloadFile,
    onDownloadFile,

    canDownloadFolder,
    onDownloadFolder,
  } = props;

  /* Custom stuff for upload file button */
  const onCreateFiles = props.browserProps && props.browserProps.createFiles;
  const canCreateFiles = Boolean(onCreateFiles);

  const onAddFiles = (e) => {
    const files = Array.prototype.slice.call(e.target.files);
    const path = props.selectedItems.length ? props.selectedItems[0].key : '';
    files && onCreateFiles(files, path);
  };

  const fileUploadRef = useRef(null);
  /* End custom stuff for upload file button */

  /** @type any */
  let actions = [];

  if (selectedItems.length) {
    // Something is selected. Build custom actions depending on what it is.
    const selectedItemsAction = selectedItems.filter((item) => item.action);
    if (selectedItemsAction.length === selectedItems.length && [...new Set(selectedItemsAction)].length === 1) {
      // Selected item has an active action against it. Disable all other actions.
      let actionText;
      switch (selectedItemsAction[0].action) {
        case 'delete':
          actionText = 'Deleting ...';
          break;

        case 'rename':
          actionText = 'Renaming ...';
          break;

        default:
          actionText = 'Moving ...';
          break;
      }

      actions = (
        // TODO: Enable plugging in custom spinner.
        <div className="item-actions">
          {icons.Loading} {actionText}
        </div>
      );
    } else {
      /* custom upload button action with standard pick-a-file browser */
      if (isFolder && canCreateFiles) {
        actions.push(
          <li key="action-upload">
            <input type="file" ref={fileUploadRef} onChange={onAddFiles} style={{ display: 'none' }} />
            <a
              href="#"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                fileUploadRef.current.click();
              }}
            >
              {icons.Text}
              &nbsp;Upload
            </a>
          </li>
        );
      }

      if (isFolder && canCreateFolder && !nameFilter) {
        actions.push(
          <li key="action-add-folder">
            <a onClick={onCreateFolder} href="#" role="button">
              {icons.Folder}
              &nbsp;Add Subfolder
            </a>
          </li>
        );
      }

      const itemsWithoutKeyDerived = selectedItems.find((item) => !item.keyDerived);
      if (!itemsWithoutKeyDerived && !isFolder && canRenameFile && selectedItems.length === 1) {
        actions.push(
          <li key="action-rename">
            <a onClick={onRenameFile} href="#" role="button">
              {icons.Rename}
              &nbsp;Rename
            </a>
          </li>
        );
      } else if (!itemsWithoutKeyDerived && isFolder && canRenameFolder) {
        actions.push(
          <li key="action-rename">
            <a onClick={onRenameFolder} href="#" role="button">
              {icons.Rename}
              &nbsp;Rename
            </a>
          </li>
        );
      }

      if (!itemsWithoutKeyDerived && !isFolder && canDeleteFile) {
        actions.push(
          <li key="action-delete">
            <a onClick={onDeleteFile} href="#" role="button">
              {icons.Delete}
              &nbsp;Delete
            </a>
          </li>
        );
      } else if (!itemsWithoutKeyDerived && isFolder && canDeleteFolder) {
        actions.push(
          <li key="action-delete">
            <a onClick={onDeleteFolder} href="#" role="button">
              {icons.Delete}
              &nbsp;Delete
            </a>
          </li>
        );
      }

      if ((!isFolder && canDownloadFile) || (isFolder && canDownloadFolder)) {
        // console.log(selectedItems[0]);
        actions.push(
          // <li key="action-download">
          //   <a href={selectedItems[0].link} download role="button">
          //     {icons.Download}
          //     &nbsp;Download
          //   </a>
          // </li>
          // above is tweaked from the original so it will open the files in a new tab
          // and leverage the browser viewer if there is one (like for PDFs).
          // original is below
          <li key="action-download">
            <a onClick={isFolder ? onDownloadFolder : onDownloadFile} href="#" role="button">
              {icons.Download}
              &nbsp;Download
            </a>
          </li>
        );
      }

      if (actions.length) {
        actions = <ul className="item-actions">{actions}</ul>;
      } else {
        actions = <div className="item-actions">&nbsp;</div>;
      }
    }
  } else {
    // Nothing selected: We're in the 'root' folder. Only allowed action is adding a folder.
    if (canCreateFolder && !nameFilter) {
      actions.push(
        <li key="action-add-folder">
          <a onClick={onCreateFolder} href="#" role="button">
            {icons.Folder}
            &nbsp;Add Folder
          </a>
        </li>
      );
    }

    if (actions.length) {
      actions = <ul className="item-actions">{actions}</ul>;
    } else {
      actions = <div className="item-actions">&nbsp;</div>;
    }
  }

  return actions;
};

Actions.propTypes = {
  selectedItems: PropTypes.arrayOf(PropTypes.object),
  isFolder: PropTypes.bool,
  icons: PropTypes.object,
  nameFilter: PropTypes.string,

  canCreateFolder: PropTypes.bool,
  onCreateFolder: PropTypes.func,

  canRenameFile: PropTypes.bool,
  onRenameFile: PropTypes.func,

  canRenameFolder: PropTypes.bool,
  onRenameFolder: PropTypes.func,

  canDeleteFile: PropTypes.bool,
  onDeleteFile: PropTypes.func,

  canDeleteFolder: PropTypes.bool,
  onDeleteFolder: PropTypes.func,

  canDownloadFile: PropTypes.bool,
  onDownloadFile: PropTypes.func,

  canDownloadFolder: PropTypes.bool,
  onDownloadFolder: PropTypes.func,
};

Actions.defaultProps = {
  selectedItems: [],
  isFolder: false,
  icons: {},
  nameFilter: '',

  canCreateFolder: false,
  onCreateFolder: null,

  canRenameFile: false,
  onRenameFile: null,

  canRenameFolder: false,
  onRenameFolder: null,

  canDeleteFile: false,
  onDeleteFile: null,

  canDeleteFolder: false,
  onDeleteFolder: null,

  canDownloadFile: false,
  onDownloadFile: null,

  canDownloadFolder: false,
  onDownloadFolder: null,
};

export default Actions;

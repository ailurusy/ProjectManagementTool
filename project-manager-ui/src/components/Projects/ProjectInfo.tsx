import React, {useRef, useState} from 'react';

import '@neo4j-ndl/base/lib/neo4j-ds-styles.css';

import {Checkbox, IconButton, Menu,} from '@neo4j-ndl/react';
import {EllipsisVerticalIconOutline} from "@neo4j-ndl/react/icons";

const ProjectInfo = () =>{

    const anchorEl = useRef<HTMLButtonElement | null>(null);
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    return (
        <div>
            <header>Project Name</header>
            <div className="date-info">
                <h2>CreatedAt Date</h2>
                <p>CreatedAt Date</p>
            </div>
            <div className="date-info">
                <h2>Start Date</h2>
                <p>Start Date</p>
            </div>
            <div className="date-info">
                <h2>End Date</h2>
                <p>End Date</p>
            </div>
            <div className="date-info">
                <h2>Priority</h2>
                <p>Priority</p>
            </div>
            <div className="description-info">
                <h2>Description</h2>
                <textarea name="description">Project Description goes here</textarea>
            </div>
            <div className ="task-info>">
                <h2>Tasks</h2>
                <p>Progression bar tasks completed.   11/22</p>
                <div className="task-table">
                    <table className="w-full">
                        <thead className="bg-gray-800 border-b border-gray-700">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">#</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Task Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Priority</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Start Date</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">End Date</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">-</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">-</th>
                        </tr>
                        </thead>
                    </table>
                    <tbody className="divide-y divide-gray-800">
                    <tr className="hover:bg-gray-800 transition-colors">
                        <td className="px-6 py-4 text-sm text-white font-medium">1</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">Task #1</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">High</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">11.11.2025</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">11.12.2025</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">In Progress</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">
                            <Checkbox ariaLabel="no-label-provided" />
                        </td>
                        <td className="px-6 py-4 text-sm text-white font-medium">
                            <div><Menu isOpen={menuIsOpen} anchorRef={anchorEl}>
                                <Menu.Items>
                                    <Menu.Item
                                        title="Edit"
                                        onClick={()=> {
                                            alert("Edit in Progress")
                                            setMenuIsOpen(false)
                                        }}
                                    />
                                    <Menu.Item
                                        title={"Delete"}
                                        onClick={()=> {
                                            alert("Deleting in Progress");
                                            setMenuIsOpen(false)
                                        }}
                                    />
                                </Menu.Items>
                            </Menu>
                                <IconButton description="More" ref={anchorEl} onClick={()=> {setMenuIsOpen(true)}}>
                                    <EllipsisVerticalIconOutline/>
                                </IconButton>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </div>
            </div>
        </div>
    );
}

export default ProjectInfo;

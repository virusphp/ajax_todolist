<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\TodoList;

class TodoListsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $todoLists = $request->user()
                        ->todolists()
                        ->orderBy('updated_at', 'desc')
                        ->get();
        return view('todolists.index', compact('todoLists'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $todolist = new TodoList();
        return view('todolists.form', compact('todolist'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
                'title' => 'required|min:5',
                'description' => 'min:5'
            ]);

        $todolist = $request->user()->todolists()->create($request->all());

        return view('todolists.item', compact('todolist'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $todolist = TodoList::findOrfail($id);
        return view('todolists.form', compact('todolist'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
                'title' => 'required|min:5',
                'description' => 'min:5'
            ]);

        $todolist = TodoList::findOrfail($id);
        $todolist->update($request->all());

        return view('todolists.item', compact('todolist'));

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $todolist = TodoList::findOrFail($id);
        $todolist->delete();

        return $todolist;
    }
}

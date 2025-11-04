'use client';

import * as React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Toggle } from '../../toggle';
import { Separator } from '../../separator';
import { Button } from '../../button';

interface MinimalTiptapProps {
  content?: string;
  onChange?: (content: string) => void;
  label?: string;
  placeholder?: string;
  editable?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
  showBold?: boolean;
  showItalic?: boolean;
  showStrike?: boolean;
  showHeadings?: boolean;
  showBulletList?: boolean;
  showOrderedList?: boolean;
  showHorizontalRule?: boolean;
  showUndoRedo?: boolean;
}

export function MinimalTiptap({
  content = ' ',
  onChange,
  label,
  error,
  placeholder = '',
  // placeholder = 'Start typing...',
  editable = true,
  className,
  required = false,
  showBold = true,
  showItalic = true,
  showStrike = true,
  showHeadings = true,
  showBulletList = true,
  showOrderedList = true,
  showHorizontalRule = true,
  showUndoRedo = true,
}: MinimalTiptapProps) {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-outside ml-6',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal list-outside ml-6',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'leading-relaxed',
          },
        },
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: 'font-bold mt-4 mb-2',
          },
        },
      }),
      Placeholder.configure({
        placeholder: placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: content || '<p></p>',
    editable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editorProps: {
      attributes: {
        class: cn(
          'min-h-[80px] max-h-40 overflow-y-auto p-4 border-0 focus:outline-none',
          '[&_.is-editor-empty]:before:text-muted-foreground [&_.is-editor-empty]:before:float-left [&_.is-editor-empty]:before:content-[attr(data-placeholder)] [&_.is-editor-empty]:before:pointer-events-none',
          '[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:my-3',
          '[&_h2]:text-xl [&_h2]:font-bold [&_h2]:my-2',
          '[&_h3]:text-lg [&_h3]:font-bold [&_h3]:my-2',
          '[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-6 [&_ol]:ml-6',
          '[&_strong]:font-bold [&_em]:italic [&_s]:line-through'
        ),

      },
    },
  });

  if (!editor) return null;

  return (
    <>
      <div className="w-full space-y-1">
        {label && (
          <label

            className={cn(
              "block text-xs font-medium mb-1",
              // whitespace-nowrap w-20 text-ellipsis overflow-hidden
              error ? "text-red-500 dark:text-red-200" : "text-label dark:text-gray-200"
            )}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className={cn('border rounded-lg overflow-hidden', className)}>
          <div className="border-b p-2 flex flex-wrap items-center gap-1">
            {showBold && (
              <Toggle
                size="sm"
                pressed={editor.isActive('bold')}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
              >
                <Bold className="h-4 w-4" />
              </Toggle>
            )}
            {showItalic && (
              <Toggle
                size="sm"
                pressed={editor.isActive('italic')}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
              >
                <Italic className="h-4 w-4" />
              </Toggle>
            )}
            {showStrike && (
              <Toggle
                size="sm"
                pressed={editor.isActive('strike')}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
              >
                <Strikethrough className="h-4 w-4" />
              </Toggle>
            )}

            {(showBold || showItalic || showStrike) && <Separator orientation="vertical" className="h-6" />}

            {showHeadings && (
              <>
                <Toggle size="sm" pressed={editor.isActive('heading', { level: 1 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                  <Heading1 className="h-4 w-4" />
                </Toggle>
                <Toggle size="sm" pressed={editor.isActive('heading', { level: 2 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                  <Heading2 className="h-4 w-4" />
                </Toggle>
                <Toggle size="sm" pressed={editor.isActive('heading', { level: 3 })} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                  <Heading3 className="h-4 w-4" />
                </Toggle>
              </>
            )}

            {(showHeadings) && <Separator orientation="vertical" className="h-6" />}

            {showBulletList && (
              <Toggle size="sm" pressed={editor.isActive('bulletList')} onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
                <List className="h-4 w-4" />
              </Toggle>
            )}
            {showOrderedList && (
              <Toggle size="sm" pressed={editor.isActive('orderedList')} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
                <ListOrdered className="h-4 w-4" />
              </Toggle>
            )}


            {showHorizontalRule && <Separator orientation="vertical" className="h-6" />}
            {showHorizontalRule && (
              <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                <Minus className="h-4 w-4" />
              </Button>
            )}

            {showUndoRedo && <Separator orientation="vertical" className="h-6" />}
            {showUndoRedo && (
              <>
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
                  <Redo className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
}